import {Component, signal, computed, input, output, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlojamientosModel, FilterState} from '../../models/alojamientos.model';

@Component({
  selector: 'app-filtrocomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtrocomponent.html',
  styleUrl: './filtrocomponent.css',
})
export class Filtrocomponent {
  alojamientosOriginales = input<AlojamientosModel[]>([]);
  cambioAlojamientos = output<AlojamientosModel[]>();

  constructor() {
    effect(() => {
      this.cambioAlojamientos.emit(this.alojamientosFiltrados());
    });
  }

  private readonly filtrosIniciales: FilterState = {
    priceRange: [0, 800000],
    selectedCities: [],
    selectedTypes: []
  };

  filtros = signal<FilterState>(this.filtrosIniciales);

  ciudadesDisponibles = computed(() => {
    return [...new Set(this.alojamientosOriginales().map(a => a.ciudad).filter(Boolean))];
  });

  tiposDisponibles = computed(() => {
    return [...new Set(this.alojamientosOriginales().map(a => a.tipo).filter(Boolean))];
  });

  alojamientosFiltrados = computed(() => {
    const filtrosActuales = this.filtros();
    return this.alojamientosOriginales().filter(item => {
      if (!item.activo) return false;
      if (item.precioNoche < filtrosActuales.priceRange[0] || item.precioNoche > filtrosActuales.priceRange[1]) {
        return false;
      }
      if (filtrosActuales.selectedCities.length > 0 && !filtrosActuales.selectedCities.includes(item.ciudad)) {
        return false;
      }
      if (filtrosActuales.selectedTypes.length > 0 && !filtrosActuales.selectedTypes.includes(item.tipo)) {
        return false;
      }
      return true;
    });
  });

  conteoCiudades = computed(() => {
    const filtrosActuales = this.filtros();
    return this.ciudadesDisponibles().map(ciudad => {
      const count = this.alojamientosOriginales().filter(item => {
        const coincidePrecio = item.precioNoche >= filtrosActuales.priceRange[0] &&
          item.precioNoche <= filtrosActuales.priceRange[1];
        return item.activo && coincidePrecio && item.ciudad === ciudad;
      }).length;
      return {city: ciudad, count};
    });
  });

  alternarCiudad(ciudad: string) {
    this.filtros.update(actual => {
      const copia = Object.assign({}, actual);

      copia.selectedCities = copia.selectedCities.includes(ciudad)
        ? copia.selectedCities.filter(c => c !== ciudad)
        : [...copia.selectedCities, ciudad];
      return copia;
    });
  }

  limpiarFiltro = () => {
    this.filtros.set(this.filtrosIniciales);
  };

  actualizarPrecioMaximo(event: Event) {
    const valor = Number((event.target as HTMLInputElement).value);
    this.filtros.update(actual => ({
      ...actual,
      priceRange: [actual.priceRange[0], valor]
    }));
  }

  seccionesAbiertas = signal({
    categories: true,
    price: true,
  });

  conteoFiltros = computed(() => {
    const actual = this.filtros();
    return actual.selectedCities.length +
      actual.selectedTypes.length +
      (actual.priceRange[0] > 0 || actual.priceRange[1] < 800000 ? 1 : 0);
  });

  mostrarContenido = signal(false);

  desplegarFiltro() {
    this.mostrarContenido.update(valor => !valor);
  }
}

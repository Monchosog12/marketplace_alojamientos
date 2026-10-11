import { Component, signal, computed, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlojamientosModel, FilterState } from '../../models/alojamientos.model';

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
    huespedRange: [1, 10],
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

      const capacidadMaxima = item.capacidad ?? (item as any).huespedes ?? 0;
      if (capacidadMaxima < filtrosActuales.huespedRange[0] || capacidadMaxima > filtrosActuales.huespedRange[1]) {
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
      return { city: ciudad, count };
    });
  });

  alternarCiudad(ciudad: string) {
    this.filtros.update(actual => ({
      ...actual,
      selectedCities: actual.selectedCities.includes(ciudad)
        ? actual.selectedCities.filter(c => c !== ciudad)
        : [...actual.selectedCities, ciudad]
    }));
  }

  alternarTipo(tipo: string) {
    this.filtros.update(actual => ({
      ...actual,
      selectedTypes: actual.selectedTypes.includes(tipo)
        ? actual.selectedTypes.filter(t => t !== tipo)
        : [...actual.selectedTypes, tipo]
    }));
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

  cantHuspedes(event: Event) {
    const valor = Number((event.target as HTMLInputElement).value);
    this.filtros.update(actual => ({
      ...actual,
      huespedRange: [actual.huespedRange[0], valor]
    }));
  }

  seccionesAbiertas = signal({
    categories: true,
    price: true,
    types: true
  });

  conteoFiltros = computed(() => {
    const actual = this.filtros();
    return actual.selectedCities.length +
      actual.selectedTypes.length +
      (actual.priceRange[0] > 0 || actual.priceRange[1] < 800000 ? 1 : 0) +
      (actual.huespedRange[0] > 1 || actual.huespedRange[1] < 10 ? 1 : 0);
  });

  mostrarContenido = signal(false);

  desplegarFiltro() {
    this.mostrarContenido.update(valor => !valor);
  }
}

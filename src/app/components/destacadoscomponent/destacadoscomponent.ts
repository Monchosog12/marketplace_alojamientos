import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { Reservacomponent } from '../reservacomponent/reservacomponent';

// Valores por defecto de los filtros
const CALIFICACION_INICIAL = 4.7;
const HUESPEDES_INICIAL = 1;

@Component({
  selector: 'app-destacadoscomponent',
  standalone: false,
  styleUrl: './destacadoscomponent.css',
  templateUrl: './destacadoscomponent.html',
})
export class Destacadoscomponent implements OnInit {
  private alojamientoservice = inject(Alojamientoservice);
  private dialog = inject(MatDialog);

  // ---------- Estado de carga ----------
  cargando = signal<boolean>(true);
  errorCarga = signal<boolean>(false);

  // ---------- Datos ----------
  alojamientos = signal<AlojamientosModel[]>([]); // todos los del servicio
  activos = signal<AlojamientosModel[]>([]); // solo activos y con precio válido
  ciudades = signal<string[]>([]); // ciudades para el select
  destacados = signal<AlojamientosModel[]>([]); // lista final mostrada

  // ---------- Filtros ----------
  calificacionMinima = signal<number>(CALIFICACION_INICIAL);
  ciudadSeleccionada = signal<string>(''); // '' significa todas las ciudades
  huespedes = signal<number>(HUESPEDES_INICIAL);
  orden = signal<string>('calificacion'); // 'calificacion' o 'precio'

  opcionesCalificacion: number[] = [4.5, 4.6, 4.7, 4.8, 4.9];

  // ---------- Indicadores para la vista ----------
  huespedesInvalido = signal<boolean>(false);
  hayFiltros = signal<boolean>(false);

  // ---------- Ciclo de vida ----------
  ngOnInit(): void {
    this.alojamientoservice.getAlojamientos().subscribe({
      next: (data) => {
        this.alojamientos.set(data);
        this.prepararDatos();
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar destacados:', err.message);
        this.errorCarga.set(true);
        this.cargando.set(false);
      },
    });
  }


  prepararDatos(): void {
    const activos = this.alojamientos().filter((a) => a.activo && a.precioNoche > 0);
    this.activos.set(activos);

    const ciudades = [...new Set(activos.map((a) => a.ciudad))].sort();
    this.ciudades.set(ciudades);

    this.aplicarFiltros();
  }

  // Recalcula la lista de destacados. Se llama cada vez que cambia un filtro
  aplicarFiltros(): void {
    const ciudad = this.ciudadSeleccionada();

    // Regla: el número de huéspedes debe ser mayor que cero
    const invalido = !(this.huespedes() >= 1);
    this.huespedesInvalido.set(invalido);

    const filtrados = this.activos().filter((a) => {
      if (a.calificacion < this.calificacionMinima()) return false;
      if (ciudad !== '' && a.ciudad !== ciudad) return false;
      // Solo se filtra por huéspedes si el valor es válido
      if (!invalido && a.capacidad < this.huespedes()) return false;
      return true;
    });

    if (this.orden() === 'precio') {
      filtrados.sort((a, b) => a.precioNoche - b.precioNoche);
    } else {
      filtrados.sort((a, b) => b.calificacion - a.calificacion);
    }
    this.destacados.set(filtrados);


    this.hayFiltros.set(
      this.calificacionMinima() !== CALIFICACION_INICIAL ||
        ciudad !== '' ||
        this.huespedes() !== HUESPEDES_INICIAL ||
        this.orden() !== 'calificacion',
    );
  }

  // ---------- Eventos de los filtros ----------
  cambiarCalificacion(event: Event): void {
    this.calificacionMinima.set(Number((event.target as HTMLSelectElement).value));
    this.aplicarFiltros();
  }

  cambiarCiudad(event: Event): void {
    this.ciudadSeleccionada.set((event.target as HTMLSelectElement).value);
    this.aplicarFiltros();
  }

  cambiarHuespedes(event: Event): void {
    this.huespedes.set(Number((event.target as HTMLInputElement).value));
    this.aplicarFiltros();
  }

  cambiarOrden(event: Event): void {
    this.orden.set((event.target as HTMLSelectElement).value);
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.calificacionMinima.set(CALIFICACION_INICIAL);
    this.ciudadSeleccionada.set('');
    this.huespedes.set(HUESPEDES_INICIAL);
    this.orden.set('calificacion');
    this.aplicarFiltros();
  }

  // ---------- Reserva ----------
  reservar(alojamiento: AlojamientosModel): void {
    this.alojamientoservice.alojamientosSeleccionados.set([alojamiento]);
    this.dialog.open(Reservacomponent, {
      width: '700px',
      height: '600px',
      autoFocus: 'dialog',
    });
  }
}

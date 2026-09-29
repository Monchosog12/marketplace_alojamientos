import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AlojamientosModel, ResenasModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { CurrencyPipe } from '@angular/common';
import { Filtrocomponent } from '../filtrocomponent/filtrocomponent';

@Component({
  selector: 'app-maincomponent',
  standalone: true,
  imports: [CurrencyPipe, Filtrocomponent],
  styleUrl: './maincomponent.css',
  templateUrl: './maincomponent.html',
})
export class Maincomponent implements OnInit {
  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  resenas = signal<ResenasModel[]>([]);
  alojamientos = signal<AlojamientosModel[]>([]);
  alojamientosOriginales = signal<AlojamientosModel[]>([]);

  latiendo = signal<number | null>(null);
  favoritos = signal<Set<number>>(new Set());

  @ViewChild(Filtrocomponent) filtroComponent!: Filtrocomponent;

  ngOnInit(): void {
    this.loadAlojamientos();
    this.loadResenas();
    this.loadFavoritos();
  }

  latir(id: number) {
    this.latiendo.set(id);

    this.favoritos.update((fav) => {
      const nuevo = new Set(fav);
      nuevo.has(id) ? nuevo.delete(id) : nuevo.add(id);
      this.alojamientoservice.guardarFavoritos([...nuevo]);
      return nuevo;
    });
  }

  esFavorito(id: number) {
    return this.favoritos().has(id);
  }

  loadAlojamientos(): void {
    this.alojamientoservice.getAlojamientos().subscribe({
      next: (data: AlojamientosModel[]) => {
        // Conserva la colección completa como fuente del filtro. La lista visible
        // se actualiza aparte cuando el componente emite los resultados filtrados.
        this.alojamientosOriginales.set(data);
        this.alojamientos.set(data);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err.message);
      },
    });
  }

  loadResenas() {
    this.alojamientoservice.getResenas().subscribe({
      next: (resenas: ResenasModel[]) => {
        this.resenas.set(resenas);
      },
      error: (err) => {
        console.error('Error al cargar reseñas:', err.message);
      },
    });
  }

  loadFavoritos() {
    this.favoritos.set(new Set(this.alojamientoservice.getFavoritos()));
  }
}

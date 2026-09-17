import { Component, inject, OnInit, signal } from '@angular/core';
import { AlojamientosModel, ResenasModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';

@Component({
  selector: 'app-maincomponent',
  standalone: false,
  styleUrl: './maincomponent.css',
  templateUrl: './maincomponent.html',
})
export class Maincomponent implements OnInit {
  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  resenas = signal<ResenasModel[]>([]);
  alojamientos = signal<AlojamientosModel[]>([]);
  grupos: AlojamientosModel[][] = [];
  ciudad: string = '';

  ngOnInit(): void {
    this.loadAlojamientos();
    this.loadResenas();
    this.loadFavoritos();
  }

  latiendo = signal<number | null>(null);
  favoritos = signal<Set<number>>(new Set());

  latir(id: number) {
    // Animación del corazón
    this.latiendo.set(id);

    // Se alterna el favorito y se guarda en localStorage
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
      next: (alojamientos: AlojamientosModel[]) => {
        this.alojamientos.set(alojamientos);
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

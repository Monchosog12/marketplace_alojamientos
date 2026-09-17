import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';

@Component({
  selector: 'app-favoritoscomponent',
  standalone: false,
  styleUrl: './favoritoscomponent.css',
  templateUrl: './favoritoscomponent.html',
})
export class Favoritoscomponent implements OnInit {
  private alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  latiendo = signal<number | null>(null);

  alojamientos = signal<AlojamientosModel[]>([]);
  // Ids guardados en localStorage
  idsFavoritos = signal<Set<number>>(new Set(this.alojamientoservice.getFavoritos()));

  // Solo los alojamientos cuyo id está entre los favoritos
  favoritos = computed(() =>
    this.alojamientos().filter((alojamiento) => this.idsFavoritos().has(alojamiento.id))
  );

  ngOnInit(): void {
    this.alojamientoservice.getAlojamientos().subscribe({
      next: (alojamientos) => {
        this.alojamientos.set(alojamientos);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err.message);
      },
    });
  }
  latir(id: number) {
    // Animación del corazón
    this.latiendo.set(id);

    // Se alterna el favorito y se guarda en localStorage
   this.idsFavoritos.update((fav) => {
      const nuevo = new Set(fav);
      nuevo.delete(id);
      this.alojamientoservice.guardarFavoritos([...nuevo]);
      return nuevo;
    });
  }

  esFavorito(id: number) {
    return this.idsFavoritos().has(id);
  }
}

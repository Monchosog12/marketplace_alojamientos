import { Component, Input, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Alojamientoservice } from '../../services/alojamientoservice';

@Component({
  selector: 'app-resenascomponent',
  standalone: false,
  templateUrl: './resenascomponent.html',
  styleUrl: './resenascomponent.css',
})
export class Resenascomponent {

  @Input({ required: true }) alojamientoId!: number;

  private readonly servicioAlojamientos = inject(Alojamientoservice);

  listaResenas = toSignal(
    this.servicioAlojamientos.getResenas().pipe(
      map(datos => datos.filter(resena => resena.alojamientoId === this.alojamientoId))
    ),
    { initialValue: [] }
  );

  calcularPromedio(): number {
    const resenas = this.listaResenas();
    if (resenas.length === 0) {
      return 0;
    }

    let sumaTotal = 0;
    for (let i = 0; i < resenas.length; i++) {
      sumaTotal += resenas[i].calificacion;
    }

    return sumaTotal / resenas.length;
  }
}

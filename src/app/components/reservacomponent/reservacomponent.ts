import { Component, inject, signal } from '@angular/core';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservacomponent',
  standalone: false,
  styleUrl: './reservacomponent.css',
  templateUrl: './reservacomponent.html',
})
export class Reservacomponent {

  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  alojamientosSeleccionados = signal<AlojamientosModel[]>([]);
  faStar = faStar;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  readonly reservaForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    fecha: new FormControl(''),
    hora: new FormControl(''),
  });

  constructor() {
    this.loadSeleccionados();
  }

  loadSeleccionados(): void {
    const seleccionados = this.alojamientoservice.alojamientosSeleccionados;
    this.alojamientosSeleccionados.set(seleccionados());
  }
}

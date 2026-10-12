import { Component, inject, signal } from '@angular/core';
import { ReservasModel } from '../../models/reservas.model';
import { Alojamientoservice } from '../../services/alojamientoservice';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  styleUrl: './misreservascomponent.css',
  templateUrl: './misreservascomponent.html',
})
export class Misreservascomponent {
  alojamientoService = inject(Alojamientoservice);

  reservas = this.alojamientoService.reservas;

}

import { Component, inject, signal } from '@angular/core';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { ReservasModel } from '../../models/reservas.model';

@Component({
  selector: 'app-detallereservacomponent',
  standalone: false,
  styleUrl: './detallereservacomponent.css',
  templateUrl: './detallereservacomponent.html',
})
export class Detallereservacomponent {
  alojamientoService = inject(Alojamientoservice);
  reservaSeleccionada = this.alojamientoService.reservasSeleccionadas;
  
  

}

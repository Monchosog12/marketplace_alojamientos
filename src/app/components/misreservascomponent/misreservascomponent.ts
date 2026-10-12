import { Component, inject, signal } from '@angular/core';
import { ReservasModel } from '../../models/reservas.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { ToastrService } from 'ngx-toastr';
import { Detallereservacomponent } from '../detallereservacomponent/detallereservacomponent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-misreservascomponent',
  standalone: false,
  styleUrl: './misreservascomponent.css',
  templateUrl: './misreservascomponent.html',
})

export class Misreservascomponent {
  alojamientoService = inject(Alojamientoservice);
  toastr = inject(ToastrService);
  reservas = this.alojamientoService.reservas;

  constructor(public dialogo: MatDialog){}

  cancelarReserva(reserva: ReservasModel) {
    this.alojamientoService.cancelarReserva(reserva.id).subscribe({
      next: () => {
        this.toastr.success("Reserva eliminada exitosamente.", "Exito");
      },
      error: () => {
        this.toastr.error("Error al cancelar la reserva.", "Error");
      },
    });
  }

  mostrarDetalleReserva(reserva: ReservasModel, event: Event) {
    this.alojamientoService.reservasSeleccionadas.set([reserva]);
    this.dialogo.open(Detallereservacomponent, {
      width: '500px',
      height: '400px',
      autoFocus: 'dialog'
    })
  }
}
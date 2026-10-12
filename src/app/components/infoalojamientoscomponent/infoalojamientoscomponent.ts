import { Component, inject, signal } from '@angular/core';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { Reservacomponent } from '../reservacomponent/reservacomponent';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-infoalojamientoscomponent',
  standalone: false,
  styleUrl: './infoalojamientoscomponent.css',
  templateUrl: './infoalojamientoscomponent.html',
})
export class Infoalojamientoscomponent {
  
  alojamientoService = inject(Alojamientoservice);
  alojamientos = signal<AlojamientosModel[]>([]);
  faStar = faStar;
  fax = faX;
  ngOnInit() {
    this.loadSeleccionados();
  }

  constructor(public dialog: MatDialog) { }


  loadSeleccionados(){
    const seleccionados = this.alojamientoService.alojamientosSeleccionados
    this.alojamientos.set(seleccionados());
  }

  openReservar(alojamiento: AlojamientosModel, event: Event): void {
      event.stopPropagation();
      this.alojamientoService.alojamientosSeleccionados.set([alojamiento]);
      this.dialog.open(Reservacomponent, {
        width: '500px',
        height: '600px',
        autoFocus: 'dialog',
      });
    }

    closeReserva() {
      this.dialog.closeAll();
    }

}

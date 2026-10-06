import { Component, inject, signal } from '@angular/core';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Infoalojamientoscomponent } from '../infoalojamientoscomponent/infoalojamientoscomponent';

@Component({
  selector: 'app-reservacomponent',
  standalone: false,
  styleUrl: './reservacomponent.css',
  templateUrl: './reservacomponent.html',
})
export class Reservacomponent {

  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  alojamientosSeleccionados = signal<AlojamientosModel[]>([]);
  dialogRef = inject(MatDialogRef<Reservacomponent>);
  faStar = faStar;
  faX = faX;
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

  constructor(public dialog: MatDialog) {
    this.loadSeleccionados();
  }

  loadSeleccionados(): void {
    const seleccionados = this.alojamientoservice.alojamientosSeleccionados;
    this.alojamientosSeleccionados.set(seleccionados());
  }

  openInfo(alojamiento: AlojamientosModel, event: Event): void {
    this.alojamientoservice.alojamientosSeleccionados.set([alojamiento]);
    this.dialog.open(Infoalojamientoscomponent, {
      width: '500px',
      height: '600px',
    });
   }

  closeReserva(): void {
    this.dialogRef.close();
  }
}

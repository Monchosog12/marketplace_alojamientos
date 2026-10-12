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
  templateUrl: './reservacomponent.html'
})
export class Reservacomponent {

  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  alojamientosSeleccionados = signal<AlojamientosModel[]>([]);
  dialogRef = inject(MatDialogRef<Reservacomponent>);
  faStar = faStar;
  faX = faX;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  readonly huespedes = new FormControl(1);
  readonly reservaForm = new FormGroup({
    nombre: new FormControl(''),
    email: new FormControl(''),
    fecha: new FormControl(''),
    hora: new FormControl('')
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
      height: '600px'
    });
  }

  nochesReservadas(): number {
    const inicio = this.range.controls.start.value;
    const fin = this.range.controls.end.value;
    if (!inicio || !fin || fin <= inicio) return 0;

    const inicioDia = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).getTime();
    const finDia = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate()).getTime();
    return Math.round((finDia - inicioDia) / 86_400_000);
  }

  precioTotal(alojamiento: AlojamientosModel): number {
    const cantidadHuespedes = Math.max(1, Number(this.huespedes.value) || 1);
    return alojamiento.precioNoche * this.nochesReservadas() * cantidadHuespedes;
  }

  esCantidadHuespedesInvalida(alojamiento: AlojamientosModel): boolean {
    const limite = alojamiento.capacidad || 0;
    const ingresados = Number(this.huespedes.value) || 0;
    return ingresados > limite;
  }

  closeReserva(): void {
    this.dialogRef.close();
  }
}

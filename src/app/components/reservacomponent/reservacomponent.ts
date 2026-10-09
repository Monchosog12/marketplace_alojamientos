import { Component, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { AlojamientosModel } from '../../models/alojamientos.model';
import { ReservasModel } from '../../models/reservas.model';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  dialogConfirmacion = viewChild.required<TemplateRef<any>>('dialogConfirmacion');
  readonly reservaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cedula: new FormControl('', Validators.required),
    huespedes: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    fechas: new FormGroup({
      start: new FormControl<Date | null>(null, Validators.required),
      end: new FormControl<Date | null>(null, Validators.required),
    }),
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
      autoFocus: 'dialog',
    });
  }

  closeReserva(): void {
    this.dialogRef.close();
  }

  openConfirmacion(nombre: any, noches: number){
    this.dialog.open(this.dialogConfirmacion(), { data: { nombre, noches } }).afterClosed().subscribe(() => this.closeReserva());
  }

  conteoNoches(): number{
    const { fechas } = this.reservaForm.getRawValue();
    if (!fechas.start || !fechas.end) {
      return 0;
    }
    const noches =  Math.ceil((fechas.end.getTime() - fechas.start.getTime()) / (1000 * 60 * 60 * 24));
    return noches;
  }

  confirmarReserva(alojamiento: AlojamientosModel) {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }
    const { nombre, email, cedula, huespedes, fechas } = this.reservaForm.getRawValue();
    const reserva: ReservasModel = {      
      id: this.alojamientoservice.reservas().length + 1,
      alojamientoId: alojamiento.id,
      nombre: nombre ?? '',
      correo: email ?? '',
      cedula: cedula ?? '',
      numHuespedes: huespedes ?? 1,
      fecha: [fechas.start!.toISOString(), fechas.end!.toISOString()],
    };
    this.alojamientoservice.reservar(reserva).subscribe({
      next: () => {
        this.openConfirmacion(this.reservaForm.controls.nombre.value, this.conteoNoches());
      },
      error: (err) => {
        console.error("Error: ", err);
      },
    });
  }
}

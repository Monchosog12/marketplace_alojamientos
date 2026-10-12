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
  fechaMinima: Date = new Date();
  dialogConfirmacion = viewChild.required<TemplateRef<any>>('dialogConfirmacion');
  readonly reservaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cedula: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[0-9]+$/)
    ]),
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

  conteoNoches(): number {
    const { start: inicio, end: fin } = this.reservaForm.controls.fechas.getRawValue();
    if (!inicio || !fin || fin <= inicio) return 0;

    const inicioDia = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).getTime();
    const finDia = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate()).getTime();
    return Math.round((finDia - inicioDia) / 86_400_000);
  }

  cantidadHuespedes(): number {
    return Math.max(1, Number(this.reservaForm.controls.huespedes.value) || 1);
  }

  precioTotal(alojamiento: AlojamientosModel): number {
    return alojamiento.precioNoche * this.conteoNoches() * this.cantidadHuespedes();
  }

  esCantidadHuespedesInvalida(alojamiento: AlojamientosModel): boolean {
    const limite = alojamiento.capacidad || 0;
    const ingresados = Number(this.reservaForm.controls.huespedes.value) || 0;
    return ingresados > limite;
  }

  confirmarReserva(alojamiento: AlojamientosModel) {
    if (this.reservaForm.invalid || this.esCantidadHuespedesInvalida(alojamiento) || this.conteoNoches() === 0) {
      this.reservaForm.markAllAsTouched();
      return;
    }
    const { nombre, email, cedula, huespedes, fechas } = this.reservaForm.getRawValue();
    const reserva: ReservasModel = {
      id: Date.now(),
      alojamientoId: alojamiento.id,
      nombre: nombre ?? '',
      correo: email ?? '',
      cedula: cedula ?? '',
      numHuespedes: huespedes ?? 1,
      precio: this.precioTotal(alojamiento),
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

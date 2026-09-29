import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AlojamientosModel, ResenasModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { CurrencyPipe } from '@angular/common';
import { Filtrocomponent } from '../filtrocomponent/filtrocomponent';
import { MatDialog } from '@angular/material/dialog';
import { Reservacomponent } from '../reservacomponent/reservacomponent';

@Component({
  selector: 'app-maincomponent',
  standalone: true,
  imports: [CurrencyPipe, Filtrocomponent],
  styleUrl: './maincomponent.css',
  templateUrl: './maincomponent.html',
})
export class Maincomponent implements OnInit {

  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  resenas = signal<ResenasModel[]>([]);
  alojamientos = signal<AlojamientosModel[]>([]);
  alojamientosOriginales = signal<AlojamientosModel[]>([]);

  @ViewChild(Filtrocomponent) filtroComponent!: Filtrocomponent;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAlojamientos();
    this.loadResenas();
  }

  loadAlojamientos(): void {
    this.alojamientoservice.getAlojamientos().subscribe({
      next: (data: AlojamientosModel[]) => {
        this.alojamientosOriginales.set(data);
        this.alojamientos.set(data);
      },
      error: (err) => {
        console.error('Error al cargar alojamientos:', err.message);
      },
    });
  }

  loadResenas() {
    this.alojamientoservice.getResenas().subscribe({
      next: (resenas: ResenasModel[]) => {
        this.resenas.set(resenas);
      },
      error: (err) => {
        console.error('Error al cargar reseñas:', err.message);
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(Reservacomponent);
  }
}

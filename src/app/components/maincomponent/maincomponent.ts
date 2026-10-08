import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AlojamientosModel, ResenasModel } from '../../models/alojamientos.model';
import { Alojamientoservice } from '../../services/alojamientoservice';
import { CurrencyPipe } from '@angular/common';
import { Filtrocomponent } from '../filtrocomponent/filtrocomponent';
import { MatDialog } from '@angular/material/dialog';
import { Reservacomponent } from '../reservacomponent/reservacomponent';
import { Infoalojamientoscomponent } from '../infoalojamientoscomponent/infoalojamientoscomponent';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maincomponent',
  standalone: true,
  imports: [CurrencyPipe, Filtrocomponent, FaIconComponent],
  styleUrl: './maincomponent.css',
  templateUrl: './maincomponent.html',
})
export class Maincomponent implements OnInit {

  alojamientoservice: Alojamientoservice = inject(Alojamientoservice);
  resenas = signal<ResenasModel[]>([]);
  alojamientos = signal<AlojamientosModel[]>([]);
  alojamientosOriginales = signal<AlojamientosModel[]>([]);
  faStar = faStar;

  @ViewChild(Filtrocomponent) filtroComponent!: Filtrocomponent;

  constructor(public dialog: MatDialog) { }

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

  openReservar(alojamiento: AlojamientosModel, event: Event): void {
    event.stopPropagation();
    this.alojamientoservice.alojamientosSeleccionados.set([alojamiento]);
    this.dialog.open(Reservacomponent, {
      width: '500px',
      height: '600px',
      autoFocus: 'dialog',
    });
  }
  
  openInfo(alojamiento: AlojamientosModel, event: Event): void {
    event.stopPropagation();
    this.alojamientoservice.alojamientosSeleccionados.set([alojamiento]);
    this.dialog.open(Infoalojamientoscomponent, {
      width: '500px',
      height: '600px',
      autoFocus: 'dialog',
    });
  }
}

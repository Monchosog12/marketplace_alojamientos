import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AlojamientosModel, ResenasModel } from '../models/alojamientos.model';
import { ReservasModel } from '../models/reservas.model';
import { MatDialog } from '@angular/material/dialog';


interface InfoAlojamientos {
    alojamientos: AlojamientosModel[];
    resenas: ResenasModel[];
}

@Injectable({
    providedIn: 'root'
})
export class Alojamientoservice {
    private cliente: HttpClient = inject(HttpClient);
    private readonly URL_BASE: string = 'assets/data/alojamientos.json';
    alojamientosSeleccionados = signal<AlojamientosModel[]>([]);
    reservasSeleccionadas = signal<ReservasModel[]>([]);
    private readonly KEY_RESERVAS: string = 'alojamientos/reservas';
    reservas = signal<ReservasModel[]>(this.leerReservas());


    constructor(public dialogo: MatDialog) { }


    getAlojamientos(): Observable<AlojamientosModel[]> {
        return this.cliente.get<InfoAlojamientos>(this.URL_BASE).pipe(
            map((data) => data.alojamientos ?? []),
            catchError((error) => {
                console.error('Error al cargar alojamientos.json:', error);
                return of<AlojamientosModel[]>([]);
            }),
        );
    }

    getResenas(): Observable<ResenasModel[]> {
        return this.cliente.get<InfoAlojamientos>(this.URL_BASE).pipe(
            map((data) => data.resenas ?? []),
            catchError((error) => {
                console.error('Error al cargar alojamientos.json:', error);
                return of<ResenasModel[]>([]);
            }),
        );
    }

    reservar(reserva: ReservasModel): Observable<ReservasModel[]> {
        const alojamiento = this.alojamientosSeleccionados().find(alojamiento => alojamiento.id === reserva.alojamientoId);
        if (!alojamiento) {
            return throwError(() => new Error(`No se encontró el alojamiento ${reserva.alojamientoId}`));
        }
        alojamiento.activo = false;

        const nuevasReservas = [...this.reservas(), reserva];
        localStorage.setItem(this.KEY_RESERVAS, JSON.stringify(nuevasReservas));
        this.reservas.set(nuevasReservas);
        return of(nuevasReservas);
    }

    leerReservas(): ReservasModel[] {
        try {
            const guardadas = JSON.parse(localStorage.getItem(this.KEY_RESERVAS) ?? '[]');
            return Array.isArray(guardadas) ? guardadas : [];
        } catch {
            return [];
        }
    }

    localStorage() {
        console.log("Local Storage" + JSON.stringify(localStorage) + "\n");
        localStorage.clear();
    }

    cancelarReserva(id: number): Observable<ReservasModel[]> {
        const reserva = this.reservas().find(reserva => reserva.id === id);
        if (!reserva) {
            return throwError(() => new Error(`No se encontró la reserva ${id}`));
        }

        const nuevasReservas = this.reservas().filter(reserva => reserva.id !== id);
        localStorage.setItem(this.KEY_RESERVAS, JSON.stringify(nuevasReservas));
        this.reservas.set(nuevasReservas);
        return of(nuevasReservas);
    }


}
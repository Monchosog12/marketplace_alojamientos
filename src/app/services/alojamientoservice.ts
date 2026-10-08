import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { AlojamientosModel, ResenasModel } from '../models/alojamientos.model';

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
    reservas: AlojamientosModel[] = [];


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

    reservar(alojamientoId: number, nuevoEstado: boolean): Observable<AlojamientosModel[]> {
        const alojamiento = this.alojamientosSeleccionados().find(alojamiento => alojamiento.id === alojamientoId);
        if (!alojamiento) {
            return throwError(() => new Error(`No se encontró el alojamiento ${alojamientoId}`));
        }
        alojamiento.activo = nuevoEstado;

        const actualesReservas: AlojamientosModel[] = JSON.parse(localStorage.getItem('alojamientos/reservas') ?? '[]');
        const index = actualesReservas.findIndex(reserva => reserva.id === alojamientoId);
        if (index === -1) {
            actualesReservas.push(alojamiento);
        } else {
            actualesReservas[index] = alojamiento;
        }

        localStorage.setItem('alojamientos/reservas', JSON.stringify(actualesReservas));
        return of(actualesReservas);
    }

    localStorage(){
        console.log("Local Storage" + JSON.stringify(localStorage) + "\n");
        // localStorage.clear();
    }
}
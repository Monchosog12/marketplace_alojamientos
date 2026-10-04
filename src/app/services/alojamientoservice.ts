import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { AlojamientosModel, ResenasModel } from '../models/alojamientos.model';

interface DataFile {
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

    private readonly data: Observable<DataFile> =
    this.cliente.get<DataFile>(this.URL_BASE).pipe(
        catchError((error) => {
            console.error('Error al cargar alojamientos.json:', error);
            return of<DataFile>({ alojamientos: [], resenas: [] });
        }),
        shareReplay(1),
    );

    getAlojamientos(): Observable<AlojamientosModel[]> {
        return this.data.pipe(map((data) => data.alojamientos ?? []));
    }

    getResenas(): Observable<ResenasModel[]> {
        return this.data.pipe(map((data) => data.resenas ?? []));
    }

   
}

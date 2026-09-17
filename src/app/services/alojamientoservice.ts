import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

    // Los favoritos viven en el navegador (localStorage), no hay backend que los guarde.
    getFavoritos(): number[] {
        try {
            const guardados = localStorage.getItem('/favoritos');
            return guardados ? (JSON.parse(guardados) as number[]) : [];
        } catch {
            return [];
        }

    }
    guardarFavoritos(ids: number[]): void {
        try {
            localStorage.setItem("/favoritos", JSON.stringify(ids));
        } catch {
            // Sin almacenamiento disponible los favoritos duran solo la sesión actual.
        }
    }
}

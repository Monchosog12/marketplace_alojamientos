export interface ReservasModel{
    id: number,
    alojamientoId: number,
    nombre: string,
    correo: string,
    cedula: string,
    numHuespedes: number,
    precio: number,
    fecha: [
        fechaInicio: string,
        fechaFin: string,
    ]
}

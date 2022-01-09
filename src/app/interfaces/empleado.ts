
export interface Empleado {
    //? --> dato opcional
    id?: string;
    nombre: string;
    apellido: string;
    rut: string;
    sueldo: number;
    fechaCreacion?: Date;
    fechaActualizacion: Date;
}

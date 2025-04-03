import { ICategoria } from "./categoria.interface";

export interface IPlato {
    id: number,
    nombre: string,
    descripcion: string,
    foto: string,
    dificultad: string,
    precio: number,
    categoria: ICategoria
}
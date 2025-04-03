import { IEncargado } from "./encargado.interface";

export interface ICategoria {
    id: number,
    nombre: string,
    descripcion: string,
    encargado: IEncargado
}
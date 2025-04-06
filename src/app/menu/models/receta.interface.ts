import { IPlato } from "./plato.interface";

export interface IReceta {
    id: number,
    preparacion: string,
    plato: IPlato
}
import { IIngredientes } from "./ingredientes.interface";
import { IReceta } from "./receta.interface";

export interface IRecetaIngredientes {
    receta: IReceta,
    ingrediente: IIngredientes,
    cantidadRequerida: number
}
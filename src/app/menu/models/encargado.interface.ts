import { ICategoria } from "./categoria.interface"

export interface IEncargado {
    id: number,
    nombre: string,
    apellido: string,
    tipoDocumento: string,
    documento: string,
    email: string,
    telefono: string,
    direccion: string
    categorias: ICategoria[]

    mostrarCategorias?: boolean
}
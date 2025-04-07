import { IEncargado } from './encargado.interface';

export interface ICategoria2 {
  categoriaId: number;
  nombre: string;
  descripcion: string;
  encargadoId: number;
  encargado: IEncargado;
}

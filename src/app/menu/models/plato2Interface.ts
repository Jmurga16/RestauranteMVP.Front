import { ICategoria } from './categoria.interface';

export interface IPlato2 {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  dificultad: string;
  precio: number;
  categoriaId: number;
  categoria?: ICategoria;
}

export interface IMenuRecetaIngredientes {
  recetaId: number;
  ingredienteId: number;
  cantidadRequerida: number;
  receta: Receta;
  ingredientes: Ingrediente[];
}

export interface Receta {
  recetaId: number;
  preparacion: string;
  platoId: number;
  plato: any;
}

export interface Ingrediente {
  ingredienteId: number;
  nombre: string;
  unidadMedida: string;
  cantidadDisponible: number;
}

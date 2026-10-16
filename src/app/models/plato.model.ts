import { Categoria } from './categoria.model';

export interface Plato {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
  categoria: Categoria | null;
}

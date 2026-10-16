import { Plato } from './plato.model';

export interface DetallePedido {
  id?: number;
  plato: Plato;
  cantidad: number;
  precioUnitario: number;
  subtotal?: number;
}

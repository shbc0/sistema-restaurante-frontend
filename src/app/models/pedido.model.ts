import { Mesa } from './mesa.model';
import { Usuario } from './usuario.model';
import { DetallePedido } from './detalle-pedido.model';

export interface Pedido {
  id?: number;
  mesa: Mesa;
  usuario: Usuario;
  estado?: string;
  total?: number;
  fechaCreacion?: string;
  detalles: DetallePedido[];
}

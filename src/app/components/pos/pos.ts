import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Plato } from '../../models/plato.model';
import { Mesa } from '../../models/mesa.model';
import { Usuario } from '../../models/usuario.model';
import { DetallePedido } from '../../models/detalle-pedido.model';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pos.html',
  styleUrls: ['./pos.css']
})
export class PosComponent implements OnInit {
  platos: Plato[] = [];
  mesas: Mesa[] = [];
  usuarios: Usuario[] = [];

  mesaSeleccionada: Mesa | null = null;
  usuarioSeleccionado: Usuario | null = null;
  carrito: DetallePedido[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.apiService.obtenerPlatos().subscribe({
      next: (data) => this.platos = data.filter(p => p.disponible),
      error: (err) => console.error('Error al cargar platos', err)
    });

    this.apiService.obtenerMesas().subscribe({
      next: (data) => this.mesas = data,
      error: (err) => console.error('Error al cargar mesas', err)
    });

    this.apiService.obtenerUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios', err)
    });
  }

  agregarAlCarrito(plato: Plato): void {
    const itemExistente = this.carrito.find(item => item.plato.id === plato.id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      this.carrito.push({
        plato: plato,
        cantidad: 1,
        precioUnitario: plato.precio
      });
    }
  }

  reducirCantidad(index: number): void {
    if (this.carrito[index].cantidad > 1) {
      this.carrito[index].cantidad--;
    } else {
      this.carrito.splice(index, 1);
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  }

  enviarPedido(): void {
    if (!this.mesaSeleccionada || !this.usuarioSeleccionado) {
      alert('Debe seleccionar una mesa y un mesero');
      return;
    }
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const nuevoPedido: Pedido = {
      mesa: this.mesaSeleccionada,
      usuario: this.usuarioSeleccionado,
      detalles: this.carrito
    };

    this.apiService.crearPedido(nuevoPedido).subscribe({
      next: (res) => {
        alert(`Pedido creado con éxito (ID: ${res.id})`);
        this.carrito = [];
        this.mesaSeleccionada = null;
      },
      error: (err) => {
        console.error('Error al crear pedido', err);
        alert('Ocurrió un error al crear el pedido');
      }
    });
  }
}

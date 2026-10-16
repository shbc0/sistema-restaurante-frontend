import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Plato } from '../../models/plato.model';
import { Categoria } from '../../models/categoria.model';


@Component({
  selector: 'app-platos-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './platos-list.html',
  styleUrl: './platos-list.css'
})
export class PlatosListComponent implements OnInit {
  platos: Plato[] = [];
  categorias: Categoria[] = [];

  platoActual: Plato = { nombre: '', descripcion: '', precio: 0, disponible: true, categoria: null };
  editando: boolean = false;

  private apiService = inject(ApiService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarPlatos();
    this.cargarCategorias();
  }

  cargarPlatos(): void {
    this.apiService.obtenerPlatos().subscribe({
      next: (data) => {
        this.platos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar platos:', err)
    });
  }

  cargarCategorias(): void {
    this.apiService.obtenerCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías', err)
    });
  }

  guardarPlato(): void {
    if (this.editando && this.platoActual.id) {
      // Actualizar (PUT)
      this.apiService.actualizarPlato(this.platoActual.id, this.platoActual).subscribe({
        next: (platoActualizado) => {
          const index = this.platos.findIndex(p => p.id === platoActualizado.id);
          if (index !== -1) {
            this.platos[index] = platoActualizado;
          }
          this.limpiarFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // Crear (POST)
      this.apiService.crearPlato(this.platoActual).subscribe({
        next: (nuevoPlato) => {
          this.platos.push(nuevoPlato);
          this.limpiarFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  seleccionarPlato(plato: Plato): void {
    this.platoActual = { ...plato };
    this.editando = true;
  }

  eliminarPlato(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este plato?')) {
      this.apiService.eliminarPlato(id).subscribe({
        next: () => {
          this.platos = this.platos.filter(p => p.id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario(): void {
    this.platoActual = { nombre: '', descripcion: '', precio: 0, disponible: true, categoria: null };
    this.editando = false;
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

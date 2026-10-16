import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../models/plato.model';
import { Categoria } from '../models/categoria.model';

import { Mesa } from '../models/mesa.model';
import { Usuario } from '../models/usuario.model';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`); // Ajusta si tu ruta base es diferente
  }

  obtenerPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.baseUrl}/platos`);
  }

  crearPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(`${this.baseUrl}/platos`, plato);
  }

  actualizarPlato(id: number, plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.baseUrl}/platos/${id}`, plato);
  }

  eliminarPlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/platos/${id}`);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credenciales);
  }

  obtenerMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.baseUrl}/mesas`);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarios`);
  }

  crearPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/pedidos`, pedido);
  }
}

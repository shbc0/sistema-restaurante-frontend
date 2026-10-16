import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  credenciales = { username: '', password: '' };
  mensajeError = '';

  private apiService = inject(ApiService);
  private router = inject(Router);

  iniciarSesion(): void {
    this.apiService.login(this.credenciales).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/platos']);
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    });
  }
}

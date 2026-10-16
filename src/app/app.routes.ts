import { Routes } from '@angular/router';
import { PlatosListComponent } from './components/platos-list/platos-list';
import { LoginComponent } from './components/login/login';
import { PosComponent } from './components/pos/pos';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'platos',
    component: PlatosListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pos',
    component: PosComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

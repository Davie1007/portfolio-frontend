import { Routes } from '@angular/router';
import { adminGuard } from './admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./admin-login').then((m) => m.AdminLogin),
  },
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () => import('./admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard) },
      {
        path: 'funding',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'testimonials',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'work',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'services',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'settings',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'donations',
        loadComponent: () => import('./admin-dashboard').then((m) => m.AdminDashboard),
      },
    ],
  },
];

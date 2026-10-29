import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then((m) => m.App),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts.component').then((m) => m.ContactsComponent),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('./projects/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'hire',
    loadComponent: () => import('./hire/hire').then((m) => m.Hire),
  },
  {
    path: 'donate',
    loadComponent: () =>
      import('./donate/donate-page.component').then((m) => m.DonatePageComponent),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

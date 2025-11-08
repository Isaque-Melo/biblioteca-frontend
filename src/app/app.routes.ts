import { Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores';

export const routes: Routes = [
  { path: 'autores', component: AutoresComponent},





  { path: '', redirectTo: '/autores', pathMatch: 'full' }
];

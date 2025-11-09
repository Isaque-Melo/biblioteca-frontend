import { Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores';
import { LivrosComponent } from './livros/livros';
import { EditorasComponent } from './editoras/editoras';
import { AutorFormComponent } from './autores/autor-form';

export const routes: Routes = [
  { path: 'autores', component: AutoresComponent},
  { path: 'livros', component: LivrosComponent},
  { path: 'editoras', component: EditorasComponent},
  { path: 'autores/novo', component: AutorFormComponent},


  // levar para o livros como principal ou rota invalida
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: '**', redirectTo: '/livros' }
];

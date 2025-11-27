import { Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores';
import { LivrosComponent } from './livros/livros';
import { EditorasComponent } from './editoras/editoras';
import { AutorFormComponent } from './autores/autor-form';
import { LoginComponent } from './login/login';
import { RegistroComponent } from './registro/registro';

export const routes: Routes = [
  { path: 'autores', component: AutoresComponent},
  { path: 'livros', component: LivrosComponent},
  { path: 'editoras', component: EditorasComponent},
  { path: 'autores/novo', component: AutorFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registrar', component: RegistroComponent},


  // levar para o livros como principal ou rota invalida
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: '**', redirectTo: '/livros' }
];

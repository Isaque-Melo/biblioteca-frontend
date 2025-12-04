import { Routes } from '@angular/router';
import { AutoresComponent } from './autores/autores';
import { LivrosComponent } from './livros/livros';
import { EditorasComponent } from './editoras/editoras';
import { AutorFormComponent } from './autores/autor-form';
import { LoginComponent } from './login/login';
import { RegistroComponent } from './registro/registro';
import { LivroFormComponent } from './livros/livro-form';
import { EditoraFormComponent } from './editoras/editora-form';


export const routes: Routes = [
  // autores
  { path: 'autores', component: AutoresComponent},
  { path: 'autores/novo', component: AutorFormComponent},

  // livros
  { path: 'livros', component: LivrosComponent},
  { path: 'livros/novo', component: LivroFormComponent},

  // editoras
  { path: 'editoras', component: EditorasComponent},
  {path: 'editoras/novo', component: EditoraFormComponent},

  // auth
    { path: 'login', component: LoginComponent},
    { path: 'registrar', component: RegistroComponent},



  // levar para o livros como principal ou rota invalida
  { path: '', redirectTo: '/livros', pathMatch: 'full' },
  { path: '**', redirectTo: '/livros' }
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LivroService } from '../services/livro';
import { EditoraService } from '../services/editora';
import { AutorService } from '../services/autor';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './livro-form.html',
})
export class LivroFormComponent implements OnInit {

  // Objeto que será enviado ao Backend (igual ao LivroFormDTO do Java)
  livro: any = {
    titulo: '',
    anoPublicacao: null,
    editoraId: null, // ID único
    autoresIds: []   // Array de IDs
  };

  // Listas para preencher os selects
  listaEditoras: any[] = [];
  listaAutores: any[] = [];

  constructor(
    private livroService: LivroService,
    private editoraService: EditoraService,
    private autorService: AutorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    // Carrega Editoras
    this.editoraService.getEditoras().subscribe((dados: any) => {
      this.listaEditoras = dados.content || dados; 
    });

    // Carrega Autores
    this.autorService.getAutores().subscribe((dados: any) => {
      // Se seu backend de autores também paginar, use dados.content
      this.listaAutores = dados.content || dados; 
    });
  }

  onSubmit() {
    this.livroService.criarLivro(this.livro).subscribe({
      next: () => {
        alert('Livro cadastrado com sucesso!');
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar livro.');
      }
    });
  }
}
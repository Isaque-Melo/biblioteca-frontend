import { Component, OnInit } from '@angular/core';
import { LivroService } from '../services/livro';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-livros',
  standalone: true, // Importante se for standalone
  imports: [CommonModule, RouterModule],
  templateUrl: './livros.html',
  styleUrls: ['./livros.css'],
})
export class LivrosComponent implements OnInit {
  livros: any[] = [];
  
  modalDelecaoVisivel = false;
  livroParaDeletarId: number | null = null;

  constructor(
    private livroService: LivroService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  get usuarioEhAdmin(): boolean {
    return this.authService.isAdmin();
  }

  carregarLivros() {
    this.livroService.getLivros().subscribe({
      next: (dados: any) => {
        // Correção para paginação do Spring
        this.livros = dados.content;
      },
      error: (err) => console.error(err)
    });
  }

  onDelete(id: number) {
    this.livroParaDeletarId = id;
    this.modalDelecaoVisivel = true;
  }

  confirmarDelecao() {
    if (this.livroParaDeletarId !== null) {
      this.livroService.deletarLivro(this.livroParaDeletarId).subscribe(() => {
        this.carregarLivros();
        this.modalDelecaoVisivel = false;
        this.livroParaDeletarId = null;
      });
    }
  }

  cancelarDelecao() {
    this.modalDelecaoVisivel = false;
    this.livroParaDeletarId = null;
  }
}
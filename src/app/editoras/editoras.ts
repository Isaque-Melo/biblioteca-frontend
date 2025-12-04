import { Component, OnInit } from '@angular/core';
import { EditoraService } from '../services/editora'; // Importe o serviço
import { AuthService } from '../services/auth';       // Importe a Auth
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editoras',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './editoras.html',
  styleUrls: ['./editoras.css'],
})
export class EditorasComponent implements OnInit {
  editoras: any[] = [];
  
  // Variáveis para o Modal
  modalDelecaoVisivel = false;
  editoraParaDeletarId: number | null = null;

  constructor(
    private editoraService: EditoraService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarEditoras();
  }

  // Verifica se é Admin para mostrar botões
  get usuarioEhAdmin(): boolean {
    return this.authService.isAdmin();
  }

  carregarEditoras() {
    this.editoraService.getEditoras().subscribe({
      next: (dados: any) => {
        // O backend retorna Page, pegamos o .content
        this.editoras = dados.content;
      },
      error: (err) => console.error('Erro ao carregar editoras', err)
    });
  }

  // Lógica do Modal de Deleção
  onDelete(id: number) {
    this.editoraParaDeletarId = id;
    this.modalDelecaoVisivel = true;
  }

  confirmarDelecao() {
    if (this.editoraParaDeletarId !== null) {
      this.editoraService.deletarEditora(this.editoraParaDeletarId).subscribe(() => {
        this.carregarEditoras(); // Recarrega a lista
        this.modalDelecaoVisivel = false;
        this.editoraParaDeletarId = null;
      });
    }
  }

  cancelarDelecao() {
    this.modalDelecaoVisivel = false;
    this.editoraParaDeletarId = null;
  }
}
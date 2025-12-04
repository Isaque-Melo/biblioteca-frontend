// Em: src/app/autores/autores.component.ts

import { Component, OnInit } from '@angular/core';
import { AutorService } from '../services/autor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './autores.html',
  styleUrls: ['./autores.css']
})
export class AutoresComponent implements OnInit { // Implemente OnInit

  autores: any[] = [];
  novoAutor = { nome: '', nacionalidade: '' };

  modalDelecaoVisivel: boolean = false;
  autorParaDeletarId: number | null = null;

  constructor(private autorService: AutorService, private authService: AuthService) {}

  ngOnInit() {
    this.carregarAutores();
  }

  get usuarioEhAdmin(): boolean {
    return this.authService.isAdmin();
  }

  carregarAutores() {
    this.autorService.getAutores().subscribe((dados: any) => {
      this.autores = dados.content;
    });
  }

  onDelete(id: number) {
    this.autorParaDeletarId = id;
    this.modalDelecaoVisivel = true;
};
  confirmarDelecao() {
    if (this.autorParaDeletarId !== null) {
      this.autorService.deletarAutor(this.autorParaDeletarId).subscribe(() => {
        this.carregarAutores();
        this.modalDelecaoVisivel = false;
        this.autorParaDeletarId = null;
      });
    }
  }
  cancelarDelecao() {
    this.modalDelecaoVisivel = false;
    this.autorParaDeletarId = null;
  }
}



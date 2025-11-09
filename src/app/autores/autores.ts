// Em: src/app/autores/autores.component.ts

import { Component, OnInit } from '@angular/core';
import { AutorService } from '../services/autor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './autores.html',
  styleUrls: ['./autores.css']
})
export class AutoresComponent implements OnInit { // Implemente OnInit

  // COLE A LÓGICA QUE ESTAVA NO app.component AQUI:
  autores: any[] = [];
  novoAutor = { nome: '', nacionalidade: '' };

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.carregarAutores();
  }

  carregarAutores() {
    this.autorService.getAutores().subscribe(dados => {
      this.autores = dados;
    });
  }

  onDelete(id: number) {
    this.autorService.deletarAutor(id).subscribe(() => {
      this.autores = this.autores.filter(autor => autor.id !== id);
    });
  }
}


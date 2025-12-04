import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EditoraService } from '../services/editora';

@Component({
  selector: 'app-editora-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editora-form.html',
  // Não precisamos de CSS específico pois usamos o global (styles.css)
})
export class EditoraFormComponent {
  
  editora = { nome: '', cidade: '' };

  constructor(
    private editoraService: EditoraService,
    private router: Router
  ) {}

  onSubmit() {
    this.editoraService.criarEditora(this.editora).subscribe({
      next: () => {
        alert('Editora cadastrada com sucesso!');
        this.router.navigate(['/editoras']);
      },
      error: (err) => {
        console.error('Erro ao salvar editora:', err);
        alert('Erro ao salvar. Verifique o console.');
      }
    });
  }
}
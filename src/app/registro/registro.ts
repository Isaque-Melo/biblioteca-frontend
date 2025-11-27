import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  dados = { nome: '', email: '', senha: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registrar(this.dados).subscribe({
      next: () => {
        alert('Conta criada com sucesso! Faça login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao criar conta. Tente outro email.');
        console.error(err);
      }
    });
  }
}
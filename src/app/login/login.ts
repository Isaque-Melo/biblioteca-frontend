import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credenciais = { email: '', senha: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credenciais).subscribe({
      next: () => {
        // Login com sucesso! Vai para a home
        this.router.navigate(['/livros']);
      },
      error: (err) => {
        alert('Falha no login! Verifique email e senha.');
        console.error(err);
      }
    });
  }
}
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  constructor(private authService: AuthService) {}

  usuarioNome = 'ADMIN';
  usuarioCartao = '123123';
  menuPerfilAberto = false;
  public verificarlogin() {
    return this.authService.isLogado();
  }

  toggleMenuPerfil() {
    this.menuPerfilAberto = !this.menuPerfilAberto;
  }
  Sair() {
    this.menuPerfilAberto = false;
    this.authService.logout();
  }

}

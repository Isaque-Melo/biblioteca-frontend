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

  menuPerfilAberto = false;
  public verificarlogin() {
    return this.authService.isLogado();
  }

  get usuarioNome(): string {
    const usuario = this.authService.obterDadosUsuario(); 
    return usuario ? usuario.nome : 'Visitante';
  }

  get usuarioCartao(): string {
    const usuario = this.authService.obterDadosUsuario(); 
    return usuario ? usuario.cartao : '---';
  }

  toggleMenuPerfil() {
    this.menuPerfilAberto = !this.menuPerfilAberto;
  }
  Sair() {
    this.menuPerfilAberto = false;
    this.authService.logout();
  }

}

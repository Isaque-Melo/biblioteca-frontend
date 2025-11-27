import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(credenciais: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciais).pipe(
      tap(resposta => {
        if (resposta.token) {
          localStorage.setItem('auth_token', resposta.token);
        }
      })
    );
  }

  registrar(dados: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, dados);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isLogado(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // O seu método já existente:
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // --- ADICIONE ESTE NOVO MÉTODO AQUI EMBAIXO ---
  public obterDadosUsuario(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      // Decodifica a parte do Payload do JWT (o "recheio" do token)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Truque para decodificar caracteres especiais (acentos, ç, etc) corretamente
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Erro ao decodificar token', error);
      return null;
    }
  }
}
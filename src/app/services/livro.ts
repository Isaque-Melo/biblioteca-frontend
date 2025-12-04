import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  private apiUrl = 'http://localhost:8081/api/livros';

  constructor(private http: HttpClient) { }

  getLivros(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  criarLivro(livro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, livro);
  }

  deletarLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutorService {

  // A URL da sua API no backend Spring
  private apiUrl = 'http://localhost:8081/api/autores';

  // Injetamos o HttpClient aqui
  constructor(private http: HttpClient) { }

  // Método para buscar todos os autores
  getAutores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // (Aqui você adicionaria os métodos para criar, editar, deletar...)
  criarAutor(autor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, autor);
  }

  editarAutor(autor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${autor.id}`, autor);
  }

  deletarAutor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

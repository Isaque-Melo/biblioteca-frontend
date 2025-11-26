import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/autor.model';

@Injectable({
  providedIn: 'root',
})
export class AutorService {

  private apiUrl = 'http://localhost:8081/api/autores';

  constructor(private http: HttpClient) { }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(this.apiUrl);
  }

  criarAutor(autor: any): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }

  editarAutor(autor: any): Observable<Autor> {
    return this.http.put<Autor>(`${this.apiUrl}/${autor.id}`, autor);
  }

  deletarAutor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

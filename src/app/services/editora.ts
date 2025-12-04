import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditoraService {
  private apiUrl = 'http://localhost:8081/api/editoras';

  constructor(private http: HttpClient) { }

  getEditoras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Se precisar criar/editar no futuro:
  criarEditora(editora: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, editora);
  }

  deletarEditora(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
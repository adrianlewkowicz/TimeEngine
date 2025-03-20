import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5050/api/Tasks';

  constructor(private http: HttpClient) {}

  /**
   * 🔐 Pobiera nagłówki z tokenem (jeśli jest dostępny)
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('⚠️ Brak tokena! Nieautoryzowane żądania mogą nie działać.');
      return new HttpHeaders({ 'Content-Type': 'application/json' }); // Brak Authorization
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * 📌 Pobiera listę zadań
   */
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error, 'Błąd pobierania zadań!'))
      );
  }

  /**
   * ➕ Dodaje nowe zadanie
   */
  addTask(title: string, projectId: string = 'default-project-id'): Observable<any> {
    const taskData = { title, projectId };

    return this.http.post<any>(this.apiUrl, taskData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error, 'Błąd dodawania zadania!'))
      );
  }

  /**
   * 🗑 Usuwa zadanie
   */
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => this.handleError(error, 'Błąd usuwania zadania!'))
      );
  }

  /**
   * ❌ Obsługa błędów HTTP
   */
  private handleError(error: HttpErrorResponse, message: string): Observable<never> {
    console.error(`❌ ${message}`, error);

    let errorMessage = `${message} (kod: ${error.status})`;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Błąd klienta: ${error.error.message}`;
    } else if (!error.status) {
      errorMessage = 'Serwer nie odpowiada. Sprawdź połączenie.';
    }

    return throwError(() => new Error(errorMessage));
  }
}

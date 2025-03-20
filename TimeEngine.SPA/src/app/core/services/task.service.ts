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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    // Sprawdzenie, czy token istnieje
    if (!token) {
      console.warn("⚠️ Brak tokena w localStorage! Nieautoryzowane żądania mogą nie działać.");
    }

    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json' // ✅ Dodano Content-Type
    });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // ✅ Obsługa błędów
      );
  }

  addTask(title: string, projectId: string = 'default-project-id'): Observable<any> {
    const taskData = { title, projectId };

    return this.http.post<any>(this.apiUrl, taskData, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // ✅ Obsługa błędów
      );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // ✅ Obsługa błędów
      );
  }

  // 🔴 Obsługa błędów HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("❌ Błąd HTTP:", error);

    let errorMessage = "Wystąpił błąd podczas komunikacji z API.";
    if (error.error instanceof ErrorEvent) {
      // Błąd klienta (np. brak internetu)
      errorMessage = `Błąd klienta: ${error.error.message}`;
    } else {
      // Błąd serwera (np. 500, 404)
      errorMessage = `Serwer zwrócił kod ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5050/api/auth';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      { email, password },
      { headers: this.getHeaders() }
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(fullName: string, email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/register`,
      { fullName, email, password },
      { headers: this.getHeaders() }
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

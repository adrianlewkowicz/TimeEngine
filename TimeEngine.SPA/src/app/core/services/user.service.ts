import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5050/api/auth';

  constructor(private http: HttpClient) {}

  getUserProfile() {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  updateUserProfile(user: any) {
    return this.http.put(`${this.apiUrl}/update-profile`, user);
  }

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ PictureUrl: string }>(`${this.apiUrl}/upload-profile-picture`, formData);
  }
}

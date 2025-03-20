import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, FormsModule, ButtonModule],
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.errorMessage = 'Rejestracja nie powiodła się.'),
    });
  }
}

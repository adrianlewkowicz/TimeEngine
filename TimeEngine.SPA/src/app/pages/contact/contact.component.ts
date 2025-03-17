import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSending: boolean = false;
  messageSent: boolean = false;
  selectedServices: string[] = [];

  services = ['Aplikacje Webowe', 'Aplikacje Mobilne', 'Chmura', 'Optymalizacja Systemów'];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  toggleService(service: string) {
    if (this.selectedServices.includes(service)) {
      this.selectedServices = this.selectedServices.filter(s => s !== service);
    } else {
      this.selectedServices.push(service);
    }
  }

  sendMessage() {
    if (this.contactForm.invalid) return;

    this.isSending = true;
    const formData = { ...this.contactForm.value, selectedServices: this.selectedServices };

    this.http.post('http://localhost:3000/send-email', formData)
      .subscribe(
        () => {
          this.isSending = false;
          this.messageSent = true;
          this.contactForm.reset();
          this.selectedServices = [];
        },
        () => {
          this.isSending = false;
          alert('Błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        }
      );
  }
}

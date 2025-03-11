import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Potrzebne dla *ngIf
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // ✅ Potrzebne dla formularza
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // ✅ Upewnij się, że HttpClientModule jest tu dodany!
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSending: boolean = false;
  messageSent: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  sendMessage() {
    if (this.contactForm.invalid) return;

    this.isSending = true;
    this.http.post('http://localhost:3000/send-email', this.contactForm.value)
      .subscribe(
        () => {
          this.isSending = false;
          this.messageSent = true;
          this.contactForm.reset();
        },
        () => {
          this.isSending = false;
          alert('Błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
        }
      );
  }
}

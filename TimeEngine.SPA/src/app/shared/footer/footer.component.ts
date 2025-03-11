import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ✅ DODAJ TO!

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],  // ✅ DODAJ TO!
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = '';

  subscribeNewsletter() {
    if (this.email.trim() === '') {
      alert('Proszę podać adres email!');
      return;
    }

    alert(`📩 Zapisano do newslettera: ${this.email}`);
    this.email = '';
  }
}

import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./ button.component.scss'],
  standalone: true,
  imports: [ButtonModule]
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() icon?: string;
  @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' = 'primary';
}

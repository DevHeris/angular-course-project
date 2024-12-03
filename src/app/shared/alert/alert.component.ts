import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  message = input<string>();
  close = output<void>();

  onClose() {
    this.close.emit();
  }
}

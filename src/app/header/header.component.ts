import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() routeSelection = new EventEmitter<string>();

  onSelect(route: string) {
    this.routeSelection.emit(route);
  }
}

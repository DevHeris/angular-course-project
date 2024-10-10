// * A directive that toggles the class 'open' on a host element
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  // Whenever isOpen is true the class open is attached to the class of the host and vice versal
  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}

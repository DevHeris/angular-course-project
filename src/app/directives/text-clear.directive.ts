import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextClear]',
})
// An attribute directive
export class TextClearDirective {
  private renderer = inject(Renderer2);
  private el = inject(ElementRef);

  constructor() {}

  // or host binding can be used to get the element instead of the renderer
  @HostBinding('textContent') textToClear: string =
    "This initial text was set by HostBinding to the paragraph's text content!";

  @HostListener('dblclick') clearText(): void {
    // 1.(intereact with the DOM directly[not adviced]) this.el.nativeElement.textContent = '';
    // 2. (use the renderer to get DOM access[not bad]) this.renderer.selectRootElement(this.el.nativeElement).textContent = '';
    // 3. (using hostbinded property)
    this.textToClear = '';
  }
}

import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHightlight]',
})
// An attribute directive
export class BetterHightlightDirective implements OnInit {
  // Note that you cant alias these type of inputs unlike @Input()
  defaultColor = input<string>();
  highlightColor = input<string>();

  @HostBinding('style.backgroundColor') backgroundColor: string;

  private elRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {}

  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');

    this.backgroundColor = this.defaultColor();
  }
  @HostListener('mouseover') mouseover() {
    this.backgroundColor = this.highlightColor();
  }
}

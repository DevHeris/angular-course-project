import { Directive, ElementRef, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
// An attribute directive
export class BasicHighlightDirective implements OnInit {
  private elementRef = inject(ElementRef);

  constructor() {}
  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}

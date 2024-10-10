import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

// A structural directive that does the opposide of ngIf
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  // the tempRef is a template. basically <ng-template></ng-template>
  private tempRef = inject(TemplateRef);
  // we need the vcRef to know where we want the template to be added
  private vcRef = inject(ViewContainerRef);

  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      // Show it if the condition is not true

      this.vcRef.createEmbeddedView(this.tempRef);
    } else {
      // Don't show it if the condition is true

      // i.e Destroy all views in this container.
      this.vcRef.clear();
    }
  }

  constructor() {}
}

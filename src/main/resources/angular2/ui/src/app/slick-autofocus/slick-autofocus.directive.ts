import { Directive, ElementRef, Renderer, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[slickAutofocus]'
})
export class SlickAutofocusDirective implements AfterContentInit {
  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngAfterContentInit() {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus');
  }
}

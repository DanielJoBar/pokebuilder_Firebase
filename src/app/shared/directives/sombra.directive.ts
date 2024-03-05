import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSombra]',
})
export class SombraDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.addShadow();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeShadow();
  }

  private addShadow() {
    this.elementRef.nativeElement.style.boxShadow =
      '10px 10px 10px rgba(0, 0, 0, 0.5)';
  }

  private removeShadow() {
    this.elementRef.nativeElement.style.boxShadow = null;
  }
}

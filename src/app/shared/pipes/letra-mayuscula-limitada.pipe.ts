import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'letraMayusculaLimitada',
})
export class LetraMayusculaLimitada implements PipeTransform {
  transform(element?: string): string {
    if (element) {
      if (element.length < 7) return (element + '.').toUpperCase();
      else return (element.substring(0, 6) + '.').toUpperCase();
    } else return '';
  }
}

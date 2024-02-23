import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    const resultsList = [];

    for (const i of value) {
      if (i.attributes.name) {
        if (i.attributes.name.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          resultsList.push(i);
        }
      } else {
        if (i.attributes.title.toLowerCase().indexOf(args.toLowerCase()) > -1) {
          resultsList.push(i);
        }
      }
    }
    return resultsList;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraLetraMayuscula'
})
export class PrimeraLetraMayusculaPipe implements PipeTransform {


  transform(element?:string): string {
 
    if (element){
     return (element[0]+".").toUpperCase()} else return ""
 }
}
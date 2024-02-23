import { Pipe, PipeTransform } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { TranslationService } from 'src/app/core/servicies/translation.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {}

  transform(word: string): string {
    var key= word;
    this.translationService.get(word).subscribe((result:string)=>{
      key = result;
      return key;
    });
    return key;
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  
  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  constructor(  private translator:TranslateService) { 
    this.translator.addLangs(['es','en','fr']);
    this.translator.setDefaultLang(this._language.value);
  }

  //Devuelve el idioma que esta seleccionado actualmente
  //Then espera a que termine el traductor a que termine de 
  //seleccionar el idioma y actualiza el behavior subject language
  use(language:string){
    lastValueFrom(this.translator.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }

/*Obtiene la traduccion de la plabra que le llega
por parámetro*/
  get(key:string):Observable<string>{
    return this.translator.get(key);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  
  private _language:BehaviorSubject<string> = new BehaviorSubject<string>('es');
  public language$ = this._language.asObservable();

  constructor(  private translate:TranslateService) { 
    this.translate.addLangs(['es','en','fr']);
    this.translate.setDefaultLang(this._language.value);
  }

  //Devuelve el idioma que esta seleccionado actualmente
  //Then espera a que termine el traductor a que termine de 
  //seleccionar el idioma y actualiza el behavior subject language
  use(language:string){
    lastValueFrom(this.translate.use(language)).then(_=>{
      this._language.next(language);
    }).catch(err=>{
      console.error(err);
    });  
  }

/*Obtiene la traduccion de la plabra que le llega
por parámetro*/
  get(key:string):Observable<string>{
    return this.translate.get(key);
  }
}

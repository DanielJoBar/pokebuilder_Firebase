import { Component } from '@angular/core';
import { AuthService } from './core/servicies/auth.service';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { TranslationService } from './core/servicies/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  currentLanguage:string="es";

  constructor(protected auth: AuthService, private router: Router, private translate:TranslationService) {}
  onSignOut(menu:IonMenu) {
    this.auth.logout().subscribe(async (_) => {
      await this.router.navigate(['/login']);
      menu.close();
    });
  }
  isLoginPage(): boolean {
    return this.router.url.includes('login');
  }
  onChangeLanguage(language:string){
    this.currentLanguage = language;
    this.translate.use(this.currentLanguage)
  }
}

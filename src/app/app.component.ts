import { Component } from '@angular/core';
import { AuthService } from './core/servicies/auth.service';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(protected auth: AuthService, private router: Router) {}
  onSignOut(menu:IonMenu) {
    this.auth.logout().subscribe(async (_) => {
      await this.router.navigate(['/login']);
      menu.close();
    });
  }
  isLoginPage(): boolean {
    
    return this.router.url.includes('login');
  }
}

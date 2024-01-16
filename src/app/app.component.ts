import { Component } from '@angular/core';
import { AuthService } from './core/servicies/auth.service';
import { Router } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(protected auth: AuthService, private router: Router) {}

  onSignOut() {
    this.auth.logout().subscribe(async (_) => {
      this.router.navigate(['/login']);
    });
  }
}

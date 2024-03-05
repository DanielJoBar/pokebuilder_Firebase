import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { LoginFormComponent } from 'src/app/shared/components/login-item/login-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPage } from './login.page';

@NgModule({
  imports: [CommonModule, SharedModule, LoginPageRoutingModule],
  declarations: [LoginPage, LoginFormComponent],
})
export class LoginPageModule {}

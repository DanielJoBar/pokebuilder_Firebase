import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { PrimeraLetraMayusculaPipe } from './pipes/primera-letra-mayuscula.pipe';
@NgModule({
  declarations: [UserSessionComponent,PrimeraLetraMayusculaPipe],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserSessionComponent,
    
  ]
})
export class SharedModule { }

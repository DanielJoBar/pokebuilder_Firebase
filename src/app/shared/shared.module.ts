import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { PrimeraLetraMayusculaPipe } from './pipes/primera-letra-mayuscula.pipe';
import { PokedexFormComponent } from './components/pokedex-form/pokedex-form.component';

@NgModule({
  declarations: [UserSessionComponent,PrimeraLetraMayusculaPipe,PokedexFormComponent],
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokedexPageRoutingModule } from './pokedex-routing.module';

import { PokedexPage } from './pokedex.page';
import { PokemonItemComponent } from 'src/app/shared/components/pokemon-item/pokemon-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PokedexPageRoutingModule,
    IonicModule
  ],
  declarations: [PokedexPage,PokemonItemComponent,]
})
export class PokedexPageModule {}

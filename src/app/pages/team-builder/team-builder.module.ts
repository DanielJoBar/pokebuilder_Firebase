import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamBuilderPageRoutingModule } from './team-builder-routing.module';

import { TeamBuilderPage } from './team-builder.page';
import { PokemonTeamComponent } from 'src/app/shared/components/pokemon-team/pokemon-team.component';
import { PokemonModalSelectComponent } from 'src/app/shared/components/pokemon-modal-select/pokemon-modal-select.component';
import { TeamCompComponent } from 'src/app/shared/components/team-comp/team-comp.component';
import { PokedexFormComponent } from 'src/app/shared/components/pokedex-form/pokedex-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonItemComponent } from 'src/app/shared/components/pokemon-item/pokemon-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamBuilderPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    TeamBuilderPage,
    PokemonTeamComponent,
    PokemonModalSelectComponent,
    TeamCompComponent
  ],
})
export class TeamBuilderPageModule {}

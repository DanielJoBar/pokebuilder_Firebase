import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { PrimeraLetraMayusculaPipe } from './pipes/primera-letra-mayuscula.pipe';
import { PokedexFormComponent } from './components/pokedex-form/pokedex-form.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonTeamFormComponent } from './components/pokemon-team-form/pokemon-team-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
@NgModule({
  declarations: [
    UserSessionComponent,
    PrimeraLetraMayusculaPipe,
    PokedexFormComponent,
    PokemonItemComponent,
    PokemonTeamFormComponent,
    FilterPipe,
    TranslatePipe
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ,
  TranslateModule.forChild({
    loader:{
      provide:TranslateLoader,
      useFactory: (TranslateService)
    }
  })
  ],
  exports: [
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserSessionComponent,
    PokemonItemComponent,
    FilterPipe
  ],
})
export class SharedModule {}

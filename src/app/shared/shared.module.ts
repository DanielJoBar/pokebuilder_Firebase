import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserSessionComponent } from './components/user-session/user-session.component';
import { LetraMayusculaLimitada } from './pipes/letra-mayuscula-limitada.pipe';
import { PokedexFormComponent } from './components/pokedex-form/pokedex-form.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { PokemonTeamFormComponent } from './components/pokemon-team-form/pokemon-team-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { createTranslateLoader } from '../core/servicies/translation.service';
import { SombraDirective } from './directives/sombra.directive';
@NgModule({
  declarations: [
    UserSessionComponent,
    LetraMayusculaLimitada,
    PokedexFormComponent,
    PokemonItemComponent,
    PokemonTeamFormComponent,
    FilterPipe,
    SombraDirective,
  
  ],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ,
  TranslateModule.forChild({
    loader:{
      provide:TranslateLoader,
      useFactory: (createTranslateLoader),
      deps:[HttpClient]
    }
  }),
  ],
  exports: [
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserSessionComponent,
    PokemonItemComponent,
    FilterPipe,
    TranslateModule,
  ],
})
export class SharedModule {}

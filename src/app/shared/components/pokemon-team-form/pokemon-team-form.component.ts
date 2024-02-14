import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { Attributes } from 'src/app/core/interfaces/pokemon-team';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-pokemon-team-form',
  templateUrl: './pokemon-team-form.component.html',
  styleUrls: ['./pokemon-team-form.component.scss'],
})
export class PokemonTeamFormComponent implements OnInit {
  

  constructor() {}
  ngOnInit() {
  }
}

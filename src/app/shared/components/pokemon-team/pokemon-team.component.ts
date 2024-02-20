import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { PokemonTeam, TeamData } from 'src/app/core/interfaces/pokemon-team';
@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss'],
})
export class PokemonTeamComponent implements OnInit {
  @Output() onTeamCompClick : EventEmitter<PokemonApi>= new EventEmitter<PokemonApi>;
  @Output() teamIdEmiter : EventEmitter<number> = new EventEmitter<number>;
  @Input() team: TeamData={
    id:-1,
    attributes:{
      title: "Team",
      pokemon_1: {
        data: []
      },
      pokemon_2: {
        data: []
      },
      pokemon_3:{
        data: []
      } ,
      pokemon_4: {
        data: []
      },
      pokemon_5: {
        data: []
      },
      pokemon_6: {
        data: []
      }
    }
  };
  pokemonList: PokemonApi[] = [];
  constructor() {}

  ngOnInit() {
    this.pokemonList.push(this.team.attributes.pokemon_1);
    this.pokemonList.push(this.team.attributes.pokemon_2);
    this.pokemonList.push(this.team.attributes.pokemon_3);
    this.pokemonList.push(this.team.attributes.pokemon_4);
    this.pokemonList.push(this.team.attributes.pokemon_5);
    this.pokemonList.push(this.team.attributes.pokemon_6);
  }
  onTeamCompClicked(event:PokemonApi){
    var pokemonapi:PokemonApi = event;
    this.onTeamCompClick.emit(event);
    this.teamIdEmiter.emit(this.team.id);
  }
  
}

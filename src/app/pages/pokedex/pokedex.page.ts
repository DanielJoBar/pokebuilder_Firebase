import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  constructor(pokemons:PokemonService) { }

  ngOnInit() {
  }
  onPokemonClicked(pokemon:Pokemon){
    
  }
}

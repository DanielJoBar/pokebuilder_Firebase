import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  constructor(protected pokemons:PokemonService) { }

  ngOnInit() {
    this.pokemons.getAll(16).subscribe
  }

}

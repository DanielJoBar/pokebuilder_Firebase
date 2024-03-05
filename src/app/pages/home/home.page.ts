import { Component } from '@angular/core';
import { AuthService } from '../../core/servicies/auth.service';
import { UserService } from '../../core/servicies/user.service';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pokemon: Pokemon = {
    id: -1,
    attributes: {
      name: '',
    },
  };
  pokemonList: Pokemon[] = [];
  constructor(private pokemonSvc: PokemonService, private auth: AuthService) {}
  ngOnInit() {
    this.pokemonSvc.getAll().subscribe((result) => {
      result.data.map((individual: Pokemon) => {
        this.pokemonList.push(individual);
      });
      var random = parseInt(Math.random() * this.pokemonList.length + '');
      this.pokemon = this.pokemonList[random];
    });
  }
  onRandomClicked() {
    var random = parseInt(Math.random() * this.pokemonList.length + '');
    this.pokemon = this.pokemonList[random];
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';

@Component({
  selector: 'app-team-comp',
  templateUrl: './team-comp.component.html',
  styleUrls: ['./team-comp.component.scss'],
})
export class TeamCompComponent implements OnInit {
  @Input() receptor: PokemonApi | null = null;
  pokemon: PokemonApi | null = null;

  constructor() {}
  ngOnInit() {}
  isPokemon(): boolean {
    if (this.receptor == null || !this.receptor.data[0]) {
      return false;
    } else this.pokemon = this.receptor;
    return true
  }
}

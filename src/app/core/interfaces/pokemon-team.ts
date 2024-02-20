import { Pokemon } from './pokemon';
import { PokemonApi } from './pokemon-api';
import { UserApi } from './user-api';

export interface PokemonTeam {
  data: TeamData[];
}

export interface TeamData {
  id?: number;
  attributes: Attributes;
}

export interface Attributes {
  title: string;
  pokemon_1: PokemonApi;
  pokemon_2: PokemonApi;
  pokemon_3: PokemonApi;
  pokemon_4: PokemonApi;
  pokemon_5: PokemonApi;
  pokemon_6: PokemonApi;
  user?:UserApi;
}

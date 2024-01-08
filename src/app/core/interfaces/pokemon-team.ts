import { PokemonApi } from "./pokemon-api"

export interface PokemonTeam {
        data: TeamData[]
          }
      
      export interface TeamData {
        id: number
        attributes: Attributes
      }
      
      export interface Attributes {
        pokemon_1: PokemonApi
        pokemon_2: PokemonApi
        pokemon_3: PokemonApi
        pokemon_4: PokemonApi
        pokemon_5: PokemonApi
        pokemon_6: PokemonApi
      }
      

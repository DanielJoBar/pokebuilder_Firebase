import { Pokemon } from './pokemon';
import { User } from './user';

export interface PokemonApi {
  data: Pokemon[]
  meta: {
    pagination: {
      page: number;
      pageSize: number,
      pageCount: number,
      total:number
    }
  }
}

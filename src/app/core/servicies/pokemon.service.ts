import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonApi } from '../interfaces/pokemon-api';
import { ApiService } from './api.service';
import { AuthStrapiService } from './auth-strapi.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private authSvc: AuthService, private apiSvc: ApiService) {}
  private _pokemon: BehaviorSubject<Pokemon[]> = new BehaviorSubject<Pokemon[]>(
    []
  );
  pokemon$ = this._pokemon.asObservable();

  /**
   public query(q: string): Observable<PokemonApi> {
     return this.apiSc.get(environment.API_URL + '/pokemons?q='+q);
   }
   * 
   */

  getTodo(userId: number): Observable<PokemonApi> {
    const apiUrl = `/pokemons?populate=user&filters[users][id]=${userId}`;
    return this.apiSvc.get(apiUrl).pipe(
      map((info: PokemonApi) => {
        const dataPokemon = info.data;
        const transformedPokemons: Pokemon[] = dataPokemon.map(
          (algo: Pokemon) => {
            return {
              id: algo.id,
              attributes: {
                name: algo.attributes.name,
                hp: algo.attributes.hp,
                atk: algo.attributes.atk,
                def: algo.attributes.def,
                speAtk: algo.attributes.speAtk,
                speDef: algo.attributes.speDef,
                speed: algo.attributes.speed,
                bst: algo.attributes.bst,
              },
            };
          }
        );
        const transformedInfo: PokemonApi = {
          data: transformedPokemons,
          meta: info.meta,
        };
        return transformedInfo;
      })
    );
  }
  public createOne(pokemon: Pokemon, userId: number): Observable<Pokemon> {
    var _newPokemon = {
      data: {
        name: pokemon.attributes.name,
        hp: pokemon.attributes.hp,
        atk: pokemon.attributes.atk,
        def: pokemon.attributes.def,
        speAtk: pokemon.attributes.speAtk,
        speDef: pokemon.attributes.speDef,
        speed: pokemon.attributes.speed,
        bst: pokemon.attributes.bst,
        users: userId,
      },
    };
    return new Observable<Pokemon>((obs) => {
      this.apiSvc.post('/pokemons/', _newPokemon).subscribe((result) => {
        this.getTodo(userId).subscribe();
        obs.next(result);
      });
    });
  }
  public deleteOne(
    pokemon: Pokemon,
    userId: number
  ): Observable<Pokemon | null> {
    const apiUrl = `/pokemons/${pokemon.id}`;
    return new Observable<Pokemon | null>((obs) => {
      if (pokemon.id > 5) {
        this.apiSvc.delete(apiUrl).subscribe((observer) => {
          this.getTodo(userId).subscribe();
          obs.next(observer);
        });
      } else {
        obs.next(null);
      }
    });
  }

  public getAll(): Observable<PokemonApi> {
    const apiUrl = `/pokemons`;
    return this.apiSvc.get(apiUrl).pipe(
      map((info: PokemonApi) => {
        const dataPokemon = info.data;
        const transformedPokemons: Pokemon[] = dataPokemon.map(
          (algo: Pokemon) => {
            return {
              id: algo.id,
              attributes: {
                name: algo.attributes.name,
                hp: algo.attributes.hp,
                atk: algo.attributes.atk,
                def: algo.attributes.def,
                speAtk: algo.attributes.speAtk,
                speDef: algo.attributes.speDef,
                speed: algo.attributes.speed,
                bst: algo.attributes.bst,
              },
            };
          }
        );
        const transformedInfo: PokemonApi = {
          data: transformedPokemons,
          meta: info.meta,
        };
        return transformedInfo;
      })
    );
  }
  public getOne(pokemonId: number): Observable<Pokemon> {
    return this.apiSvc.get(`/pokemons/${pokemonId}`).pipe(
      map((pokemon: any) => {
        console.log('El pokemon es: ' + pokemon);
        var pokemonR: Pokemon = {
          id: pokemon.data.id,
          attributes: {
            name: pokemon.data.attributes.name,
            hp: pokemon.data.attributes.hp,
            atk: pokemon.data.attributes.atk,
            def: pokemon.data.attributes.def,
            speAtk: pokemon.data.attributes.speAtk,
            speDef: pokemon.data.attributes.speDef,
            speed: pokemon.data.attributes.speed,
            bst: pokemon.data.attributes.bst,
          },
        };
        console.log('El pokemon es: ' + pokemon);
        return pokemonR;
      })
    );
  }

  public updateOne(pokemon: Pokemon, userId: number): Observable<Pokemon> {
    return new Observable<Pokemon>((obs) => {
      this.apiSvc
        .patch(`/pokemons/${pokemon.id}`, pokemon)
        .subscribe((observer) => {
          this.getTodo(userId).subscribe();
          obs.next(observer);
        });
    });
  }
}

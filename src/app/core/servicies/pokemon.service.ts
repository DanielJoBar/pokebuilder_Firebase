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

  constructor(private authSvc: AuthService, private apiSvc: ApiService) {
  }
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

  getTodo(userId:number): Observable<PokemonApi> {
    const apiUrl = "/pokemons?populate=user&filters[user]="+userId;
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

        // Actualizamos data en info
        const transformedInfo: PokemonApi = {
          data: transformedPokemons,
          meta: info.meta,
        };

        // Devolvemos la información transformada
        return transformedInfo;
      })
    );
  }
  public createOne(pokemon: Pokemon,userId:number): Observable<PokemonApi> {
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
        users:userId
      },
    };
    return new Observable<PokemonApi>((obs) => {
      this.apiSvc.post('/pokemons/', _newPokemon).subscribe();
    });
  }
  public deleteOne(pokemon: Pokemon): Observable<Pokemon> {
    return new Observable<Pokemon>((obs) => {
      this.apiSvc
        .delete(environment.API_URL + `/pokemons/${pokemon.id}`)
        .subscribe((observer) => {
          this.getTodo(1).subscribe();
        });
    });
  }

  /*public getAll(userId: number): Observable<Pokemon[]> {
    console.log('Entra en el getAll');
    return this.apiSvc.get(`/pokemons`).pipe(
      map((data: PokemonApi) => {
        return data.data.map((pokemon:any) => {
          return {
            id:pokemon.id,
            name: pokemon.attributes.name,
            hp: pokemon.attributes.hp,
            atk: pokemon.attributes.atk,
            def: pokemon.attributes.def,
            speAtk: pokemon.attributes.speAtk,
            speDef: pokemon.attributes.speDef,
            speed: pokemon.attributes.speed,
            bst: pokemon.attributes.bst,
          }
        })
      })
    );

  }*/
  /*public getOne(id: number): Observable<Pokemon> {
    return this.apiSvc.get(`/pokemons/${id}`).pipe(
      map((pokemon: PokemonApi) => {
        var atributos = pokemon.data[id];
        return {
          name: atributos.name,
          hp: atributos.hp,
          atk: atributos.atk,
          def: atributos.def,
          speAtk: atributos.speAtk,
          speDef: atributos.speDef,
          speed: atributos.speed,
          bst: atributos.bst ?? 0,
        };
      })
    );
  }*/

  public updateOne(pokemon: Pokemon): Observable<PokemonApi> {
    return new Observable<PokemonApi>((obs) => {
      this.apiSvc
        .patch(environment.API_URL + `/pokemons/${pokemon.id}`, pokemon)
        .subscribe((observer) => {
          this.getTodo(1).subscribe();
        });
    });
  }
}

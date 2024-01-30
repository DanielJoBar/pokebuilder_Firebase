import { Injectable } from '@angular/core';
import { HttpClientProvider } from './http-client.provider';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonApi } from '../interfaces/pokemon-api';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient, private apiSvc: ApiService) {}
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
  public getAll(userId: number): Observable<Pokemon[]> {
    console.log("Entra en el getAll");
    return this.apiSvc.get(`/pokemons?populate=user&filters[user=${userId}]`).pipe(
      map((pokemons: PokemonApi) => {
        console.log("El pokemon que llega es: "+pokemons);
          return pokemons.data.map((dataPoke: any) => ({
            name: dataPoke.name,
            hp: dataPoke.hp,
            atk: dataPoke.atk,
            def: dataPoke.def,
            speAtk: dataPoke.speAtk,
            speDef: dataPoke.speDef,
            speed: dataPoke.speed,
            bst: dataPoke.bst,
          }));
      }),
      tap((individual) => {
        this._pokemon.next(individual);
      })
    );
  }
  public getOne(id: number): Observable<Pokemon> {
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
  }
  public deleteOne(pokemon: Pokemon): Observable<Pokemon> {
    return new Observable<Pokemon>((obs) => {
      this.apiSvc
        .delete(environment.API_URL + `/pokemons/${pokemon.id}`)
        .subscribe((observer) => {
          this.getAll(1).subscribe((_) => {
            obs.next(pokemon);
          });
        });
    });
  }
  public updateOne(pokemon: Pokemon): Observable<Pokemon> {
    return new Observable<Pokemon>((obs) => {
      this.apiSvc
        .patch(environment.API_URL + `/pokemons/${pokemon.id}`, pokemon)
        .subscribe((observer) => {
          this.getAll(1).subscribe((_) => {
            obs.next(pokemon);
          });
        });
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { PokemonTeam, TeamData } from '../interfaces/pokemon-team';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonTeamService {
  
  private _pokeTeam: BehaviorSubject<TeamData[]|null> = new BehaviorSubject<TeamData[]|null>(null)
  pokeTeam$ = this._pokeTeam.asObservable();

  constructor(private apiSvc:ApiService) { }
  addTeam(pokemonArray: Pokemon[]): Observable<PokemonTeam> {
    var team = {
      pokemon_1: pokemonArray[0] || null,
      pokemon_2: pokemonArray[1] || null,
      pokemon_3: pokemonArray[2] || null,
      pokemon_4: pokemonArray[3] || null,
      pokemon_5: pokemonArray[4] || null,
      pokemon_6: pokemonArray[5] || null,
    };
    return this.apiSvc.post('/pokemon-teams', team);
  } 
  public getAll(userId: number): Observable<TeamData[]> {
    return this.apiSvc.get(`/pokemon-teams?populate=pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6&filters[user]=${userId}`).pipe(
      map((pokemonTeamData: any) => {
          return pokemonTeamData.data.map((pokemons:TeamData)=>{
            return{
            pokemon_1: pokemons.attributes.pokemon_1,
            pokemon_2: pokemons.attributes.pokemon_2,
            pokemon_3: pokemons.attributes.pokemon_3,
            pokemon_4: pokemons.attributes.pokemon_4,
            pokemon_5: pokemons.attributes.pokemon_5,
            pokemon_6: pokemons.attributes.pokemon_6,
          }
          })
      }),
      tap((individual) => {
        this._pokeTeam.next(individual);
      })
    );
  }
  public getOne(id: number): Observable<any> {
    return this.apiSvc.get(`/pokemons/${id}`).pipe(
      map((pokemon: any) => {
        id:pokemon.id
        return {
          id: pokemon.id,
          pokemon_1: pokemon.attributes.pokemon_1,
          pokemon_2: pokemon.attributes.pokemon_2,
          pokemon_3: pokemon.attributes.pokemon_3,
          pokemon_4: pokemon.attributes.pokemon_4,
          pokemon_5: pokemon.attributes.pokemon_5,  
          pokemon_6: pokemon.attributes.pokemon_6,
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

import { HttpClient } from '@angular/common/http';
import { Attribute, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Attributes, PokemonTeam, TeamData } from '../interfaces/pokemon-team';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { ApiService } from './api.service';
import { PokemonApi } from '../interfaces/pokemon-api';

@Injectable({
  providedIn: 'root',
})
export class PokemonTeamService {
  private _pokeTeam: BehaviorSubject<TeamData[]> = new BehaviorSubject<
    TeamData[]
  >([]);
  pokeTeam$ = this._pokeTeam.asObservable();

  constructor(private apiSvc: ApiService) {}
  addTeam(
    newTitle: string,
    team: Pokemon[],
    userId: number
  ): Observable<TeamData> {
    var url = `/pokemon-teams?populate=users,pokemon_1,pokemon_2,pokemon_3,pokemon_4,Pokemon_5,Pokemon_6&filters[users]=${userId}`;
    var pkmArray: PokemonApi[] = this.toArrayOfArrays(team);
    const newTeam: TeamData = {
      attributes: {
        title: newTitle,
        pokemon_1: pkmArray[0],
        pokemon_2: pkmArray[1],
        pokemon_3: pkmArray[2],
        pokemon_4: pkmArray[3],
        pokemon_5: pkmArray[4],
        pokemon_6: pkmArray[5],
      },
    };
    return this.apiSvc.post(url, newTeam);
  }
  public getAll(): Observable<TeamData> {
    var url = `/pokemon-teams?populate=pokemon_1,pokemon_2,pokemon_3,pokemon_4,Pokemon_5,Pokemon_6`;
    return this.apiSvc.get(url).pipe(
      map((pokemonTeam: PokemonTeam) => {
        const data = pokemonTeam.data;
        var innerData: TeamData;
        const info = data.map((team: TeamData) => {
          innerData = {
            id: team.id,
            attributes: {
              title: team.attributes.title,
              pokemon_1: team.attributes.pokemon_1,
              pokemon_2: team.attributes.pokemon_2,
              pokemon_3: team.attributes.pokemon_3,
              pokemon_4: team.attributes.pokemon_4,
              pokemon_5: team.attributes.pokemon_5,
              pokemon_6: team.attributes.pokemon_6,
            },
          };
          return innerData;
        });

        return innerData!;
      })
    );
  }
  public getAllFromUser(userId: number): Observable<TeamData> {
    return this.apiSvc
      .get(
        `/pokemon-teams?populate=pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6&filters[users]=${userId}`
      )
      .pipe(
        map((pokemonTeam: PokemonTeam) => {
          const data = pokemonTeam.data;
          var innerData: TeamData;
          const info = data.map((team: TeamData) => {
            innerData = {
              id: team.id,
              attributes: {
                title: team.attributes.title,
                pokemon_1: team.attributes.pokemon_1,
                pokemon_2: team.attributes.pokemon_2,
                pokemon_3: team.attributes.pokemon_3,
                pokemon_4: team.attributes.pokemon_4,
                pokemon_5: team.attributes.pokemon_5,
                pokemon_6: team.attributes.pokemon_6,
              },
            };
            return innerData;
          });
          return innerData!;
        })
      );
  }
  public getOne(id: number): Observable<any> {
    return this.apiSvc.get(`/pokemons/${id}`).pipe(
      map((pokemon: any) => {
        id: pokemon.id;
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
          this.getAll().subscribe((_) => {
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
          this.getAll().subscribe((_) => {
            obs.next(pokemon);
          });
        });
    });
  }
  private toArrayOfArrays(list: Pokemon[]): PokemonApi[] {
    const result: PokemonApi[] = [];
    list.forEach((pkm) => {
      const pokemonApi: PokemonApi = {
        data: [pkm],
      };
      result.push(pokemonApi);
    });
    return result;
  }
}

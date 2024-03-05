import { HttpClient } from '@angular/common/http';
import { Attribute, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Attributes, PokemonTeam, TeamData } from '../interfaces/pokemon-team';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { ApiService } from './api.service';
import { PokemonApi } from '../interfaces/pokemon-api';
import { UserApi } from '../interfaces/user-api';

@Injectable({
  providedIn: 'root',
})
export class PokemonTeamService {
  private _pokeTeam: BehaviorSubject<TeamData[]> = new BehaviorSubject<
    TeamData[]
  >([]);
  pokeTeam$ = this._pokeTeam.asObservable();

  constructor(private apiSvc: ApiService) {}
  addTeam(newTeam: TeamData, currentUser: UserApi): Observable<TeamData> {
    var url = `/pokemon-teams?populate=user,pokemon_1,pokemon_2,pokemon_3,pokemon_4,Pokemon_5,Pokemon_6`;
    const mappedTeam = {
      data: {
        title: newTeam.attributes.title,
        pokemon_1: newTeam.attributes.pokemon_1.data.length > 0 ? {
          
          id: newTeam.attributes.pokemon_1.data[0].id,
          name: newTeam.attributes.pokemon_1.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_1.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_1.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_1.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_1.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_1.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_1.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_1.data[0].attributes.bst,

        } : {data:[]},

        pokemon_2: newTeam.attributes.pokemon_2.data.length > 0 ? {

          id: newTeam.attributes.pokemon_2.data[0].id,
          name: newTeam.attributes.pokemon_2.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_2.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_2.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_2.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_2.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_2.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_2.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_2.data[0].attributes.bst,
        
        } : {data:[]},

        pokemon_3: newTeam.attributes.pokemon_3.data.length > 0 ? {

          id: newTeam.attributes.pokemon_3.data[0].id,
          name: newTeam.attributes.pokemon_3.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_3.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_3.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_3.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_3.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_3.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_3.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_3.data[0].attributes.bst,

        } : {data:[]},

        pokemon_4: newTeam.attributes.pokemon_4.data.length > 0 ? {

          id: newTeam.attributes.pokemon_4.data[0].id,
          name: newTeam.attributes.pokemon_4.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_4.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_4.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_4.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_4.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_4.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_4.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_4.data[0].attributes.bst,

        } : {data:[]},

        pokemon_5: newTeam.attributes.pokemon_5.data.length > 0 ? {

          id: newTeam.attributes.pokemon_5.data[0].id,
          name: newTeam.attributes.pokemon_5.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_5.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_5.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_5.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_5.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_5.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_5.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_5.data[0].attributes.bst,

        } : {data:[]},

        pokemon_6: newTeam.attributes.pokemon_6.data.length > 0 ? {

          id: newTeam.attributes.pokemon_6.data[0].id,
          name: newTeam.attributes.pokemon_6.data[0].attributes.name,
          hp: newTeam.attributes.pokemon_6.data[0].attributes.hp,
          atk: newTeam.attributes.pokemon_6.data[0].attributes.atk,
          def: newTeam.attributes.pokemon_6.data[0].attributes.def,
          speAtk: newTeam.attributes.pokemon_6.data[0].attributes.speAtk,
          speDef: newTeam.attributes.pokemon_6.data[0].attributes.speDef,
          speed: newTeam.attributes.pokemon_6.data[0].attributes.speed,
          bst: newTeam.attributes.pokemon_6.data[0].attributes.bst,

        } : {data:[]},
        user: {
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
        },
      },
    };
    var data = this.apiSvc.post(url, mappedTeam);
    return data;
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
  public getAllFromUser(userId: number): Observable<TeamData[]> {
    return this.apiSvc
      .get(
        `/pokemon-teams?populate=pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6&filters[user]=${userId}`
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
            return data;
          });
          return data!;
        })
      );
  }

  public deleteOne(id:number,userId:number): Observable<any> {
    return new Observable<any>((obs) => {
      this.apiSvc.delete(`/pokemon-teams/${id}`).subscribe((observer) => {
        this.getAllFromUser(userId).subscribe();
        obs.next(observer);
      });
  });
  }
  public updateOne(
    pokemonTeam: TeamData,
    teamId: number,
    user: UserApi
  ): Observable<TeamData> {
    const updatedTeam: any = {
      data: {
        id: pokemonTeam.id,
        attributes: {
          title: pokemonTeam.attributes.title,
          pokemon_1: pokemonTeam.attributes.pokemon_1,
          pokemon_2: pokemonTeam.attributes.pokemon_2,
          pokemon_3: pokemonTeam.attributes.pokemon_3,
          pokemon_4: pokemonTeam.attributes.pokemon_4,
          pokemon_5: pokemonTeam.attributes.pokemon_5,
          pokemon_6: pokemonTeam.attributes.pokemon_6,
          user: {
            data: {
              id: user.id,
              attributes: {
                username: user.username,
                email: user.email,
              },
            },
          },
        },
      },
    };

    var url = `/pokemon-teams/${teamId}?populate=pokemon_1,pokemon_2,pokemon_3,pokemon_4,Pokemon_5,Pokemon_6,user`;
    var queryResult;
    return this.apiSvc.put(url, updatedTeam).pipe(
      map((result: any) => {
        queryResult = result;
        console.log('Resultado query: ' + queryResult);
        return queryResult;
      })
    );
  }
}

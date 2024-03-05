import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { PokemonTeam, TeamData } from 'src/app/core/interfaces/pokemon-team';
import { UserApi } from 'src/app/core/interfaces/user-api';
import { AuthService } from 'src/app/core/servicies/auth.service';
import { PokemonTeamService } from 'src/app/core/servicies/pokemon-team.service';
import { UserService } from 'src/app/core/servicies/user.service';
import { PokedexFormComponent } from 'src/app/shared/components/pokedex-form/pokedex-form.component';
import { PokemonModalSelectComponent } from 'src/app/shared/components/pokemon-modal-select/pokemon-modal-select.component';
import { PokemonTeamFormComponent } from 'src/app/shared/components/pokemon-team-form/pokemon-team-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.page.html',
  styleUrls: ['./team-builder.page.scss'],
})
export class TeamBuilderPage implements OnInit {
  teamFilter = '';
  pokemons!: TeamData;
  deletionMode: boolean = false;
  creationMode: boolean = false;
  pokemonsList: TeamData[] = [];
  User!: UserApi;
  constructor(
    protected teamScv: PokemonTeamService,
    private authSvc: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authSvc.me().subscribe((result: UserApi) => {
      this.User = result;
      this.teamScv
        .getAllFromUser(this.User.id)
        .subscribe((team: TeamData[]) => {
          if (team) {
            this.pokemonsList! = team;
          }
        });
    });
  }
  async onAddClicked() {
    this.creationMode = true;
    const modal = await this.modalCtrl.create({
      component: PokemonTeamFormComponent,
      componentProps: {
        UserId: this.User.id,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role == 'confirm') {
      this.teamScv.addTeam(data, this.User).subscribe((result: TeamData) => {
        this.teamScv
          .getAllFromUser(this.User.id)
          .subscribe((team: TeamData[]) => {
            if (team) {
              this.pokemonsList! = team;
            }
          });
      });
    }
    this.creationMode = false;
  }
  onDeleteEnable() {
    this.deletionMode = !this.deletionMode;
  }

  async onTeamClicked(pokemonObtained: PokemonApi, teamId: number) {
    if (!this.deletionMode) {
      var currentTeam!: TeamData;
      for (var i in this.pokemonsList) {
        if (this.pokemonsList[i].id == teamId) {
          currentTeam = this.pokemonsList[i];
        }
      }
      if (pokemonObtained == null || !pokemonObtained.data[0]) {
        const modal = await this.modalCtrl.create({
          component: PokemonModalSelectComponent,
          componentProps: {
            userId: this.User.id,
          },
        });
        modal.present();
        const { data, role } = await modal.onWillDismiss();
        if (data != '') {
          if ((currentTeam.attributes.pokemon_1.data = [])) {
            currentTeam.attributes.pokemon_1.data[0] = data;
          } else if ((currentTeam.attributes.pokemon_2.data = [])) {
            currentTeam.attributes.pokemon_2.data[0] = data;
          } else if ((currentTeam.attributes.pokemon_3.data = [])) {
            currentTeam.attributes.pokemon_3.data[0] = data;
          } else if ((currentTeam.attributes.pokemon_4.data = [])) {
            currentTeam.attributes.pokemon_4.data[0] = data;
          } else if ((currentTeam.attributes.pokemon_5.data = [])) {
            currentTeam.attributes.pokemon_5.data[0] = data;
          } else {
            currentTeam.attributes.pokemon_6.data[0] = data;
          }
        }
        this.teamScv.updateOne(currentTeam, teamId, this.User).subscribe((_) => {
          this.teamScv
            .getAllFromUser(this.User.id)
            .subscribe((result: TeamData[]) => {
              this.pokemonsList = result;
            });
        });
      } else {
      const modal = await this.modalCtrl.create({
        component: PokedexFormComponent,
        componentProps: {
          mode: 'View',
          pkm: pokemonObtained.data[0],
        },
      });
      modal.present();
      const { data, role } = await modal.onWillDismiss();
      if (role == 'removed') {
        if (
          currentTeam.attributes.pokemon_1.data[0] == pokemonObtained.data[0]
        ) {
          currentTeam.attributes.pokemon_1.data = [];
        } else if (
          currentTeam.attributes.pokemon_2.data[0] == pokemonObtained.data[0]
        ) {
          currentTeam.attributes.pokemon_2.data = [];
        } else if (
          currentTeam.attributes.pokemon_3.data[0] == pokemonObtained.data[0]
        ) {
          currentTeam.attributes.pokemon_3.data = [];
        } else if (
          currentTeam.attributes.pokemon_4.data[0] == pokemonObtained.data[0]
        ) {
          currentTeam.attributes.pokemon_4.data = [];
        } else if (
          currentTeam.attributes.pokemon_5.data[0] == pokemonObtained.data[0]
        ) {
          currentTeam.attributes.pokemon_5.data = [];
        } else {
          currentTeam.attributes.pokemon_6.data = [];
        }
        this.teamScv
          .updateOne(currentTeam, teamId, this.User)
          .subscribe((_) => {
            this.teamScv
              .getAllFromUser(this.User.id)
              .subscribe((result: TeamData[]) => {
                this.pokemonsList = result;
              });
          });
        }
      }
    }
  }
  onDeleteClicked(id: number) {
    if (this.deletionMode) {
      this.deletionMode = false;
      this.teamScv.deleteOne(id, this.User.id).subscribe(() => {
        this.teamScv
          .getAllFromUser(this.User.id)
          .subscribe((result: TeamData[]) => {
            this.pokemonsList = result;
          });
      });
    }
  }
}

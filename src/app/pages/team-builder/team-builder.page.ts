import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { TeamData } from 'src/app/core/interfaces/pokemon-team';
import { UserApi } from 'src/app/core/interfaces/user-api';
import { AuthService } from 'src/app/core/servicies/auth.service';
import { PokemonTeamService } from 'src/app/core/servicies/pokemon-team.service';
import { UserService } from 'src/app/core/servicies/user.service';
import { PokemonTeamFormComponent } from 'src/app/shared/components/pokemon-team-form/pokemon-team-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.page.html',
  styleUrls: ['./team-builder.page.scss'],
})
export class TeamBuilderPage implements OnInit {
  pokemons!: TeamData;
  pokemonsList:TeamData[]=[];
  idUser!: Number;
  constructor(
    protected teamScv: PokemonTeamService,
    private authSvc: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authSvc.me().subscribe((result: UserApi) => {
      var userId = result.id;
      this.idUser = userId;
      this.teamScv.getAllFromUser(userId).subscribe((team: TeamData) => {
        this.pokemons = team;
        this.pokemonsList.push(this.pokemons)
      });
    });
  }
  async onCreateClicked(team?: TeamData) {
    const modal = await this.modalCtrl.create({
      component: PokemonTeamFormComponent,
      componentProps: {
        Mode: team ? 'Edit' : 'New',
        PokemonTeam: team,
      },
    });
    modal.present();
    /*const { data, role } = await modal.onWillDismiss();
    if (role === 'New') {
      this.teamScv.createOne(data, this.idUser!).subscribe((_) => {
        this.pokemonSvc
          .getTodo(this.idUser!)
          .subscribe((result: PokemonApi) => {
            this.pokemons = result.data;
          });
      });
      this.pokemonSvc.getTodo(this.idUser!).subscribe();
    } else if (role === 'Edit') {
      this.pokemonSvc.updateOne(data, this.idUser!).subscribe((_) => {
        this.pokemonSvc
          .getTodo(this.idUser!)
          .subscribe((result: PokemonApi) => {
            this.pokemons = result.data;
          });
      });
    }*/
  }
}

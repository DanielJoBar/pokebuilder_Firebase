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
  pokemons!: TeamData;
  pokemonsList: TeamData[] = [];
  User!: UserApi;
  idTeam!:number;
  constructor(
    protected teamScv: PokemonTeamService,
    private authSvc: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.authSvc.me().subscribe((result: UserApi) => {
       this.User = result;
      this.teamScv.getAllFromUser(this.User.id).subscribe((team: TeamData[]) => {
        if (team) {
          this.pokemonsList! = team;
        }
      });
    });
  }
  async onAddClicked(){
    const modal = await this.modalCtrl.create({
      component: PokemonTeamFormComponent,
      componentProps:{
        UserId:this.User.id
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if( role == 'confirm' ) {
      this.teamScv.addTeam(data,this.User).subscribe((result:TeamData)=>{
        this.teamScv.getAllFromUser(this.User.id).subscribe((team: TeamData[]) => {
          if (team) {
            this.pokemonsList! = team;
          }
        });
      })
    }
  }
  onDeleteClicked(){

  }
  getIdTeam(id:number){
    this.idTeam = id;
  }
  /*
  async onCreateClicked(team?: TeamData) {
    const modal = await this.modalCtrl.create({
      component: PokemonModalSelectComponent,
      componentProps: {
        Mode: team ? 'Edit' : 'New',
        PokemonTeam: team,
      },
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
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
    }
  }*/
  async onEditOrAddComp(pokemonObtained: PokemonApi) {
    var currentTeam!:TeamData;
    for(var i in this.pokemonsList){
      if( this.pokemonsList[i].id == this.idTeam ){
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
      const { data ,role} = await modal.onWillDismiss();
      if (data != '') {

          if(currentTeam.attributes.pokemon_1.data =[]){
            currentTeam.attributes.pokemon_1.data[0] = data;
          }
          else if(currentTeam.attributes.pokemon_2.data =[]){
            currentTeam.attributes.pokemon_2.data[0] = data;
          }
          else if(currentTeam.attributes.pokemon_3.data =[]){
            currentTeam.attributes.pokemon_3.data[0] = data;
          }
          else if(currentTeam.attributes.pokemon_4.data =[]){
            currentTeam.attributes.pokemon_4.data[0] = data;
          }
          else if(currentTeam.attributes.pokemon_5.data =[]){
            currentTeam.attributes.pokemon_5.data[0] = data;
          }
          else{
            currentTeam.attributes.pokemon_6.data[0] = data;
          }
        }
        this.teamScv.updateOne(currentTeam, this.idTeam!,this.User).subscribe( _ => {
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
      const { data ,role} = await modal.onWillDismiss();
      if(role == 'removed'){
          if(currentTeam.attributes.pokemon_1.data[0] == pokemonObtained.data[0]){
            currentTeam.attributes.pokemon_1.data = [];
          }
          else if(currentTeam.attributes.pokemon_2.data[0] == pokemonObtained.data[0]){
            currentTeam.attributes.pokemon_2.data = [];
          }
          else if(currentTeam.attributes.pokemon_3.data[0] == pokemonObtained.data[0]){
            currentTeam.attributes.pokemon_3.data = [];
          }
          else if(currentTeam.attributes.pokemon_4.data[0] == pokemonObtained.data[0]){
            currentTeam.attributes.pokemon_4.data = [];
          }
          else if(currentTeam.attributes.pokemon_5.data[0] == pokemonObtained.data[0]){
            currentTeam.attributes.pokemon_5.data = [];
          }
          else{
            currentTeam.attributes.pokemon_6.data = [];
          }
        this.teamScv.updateOne(currentTeam, this.idTeam!,this.User).subscribe( _ => {
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

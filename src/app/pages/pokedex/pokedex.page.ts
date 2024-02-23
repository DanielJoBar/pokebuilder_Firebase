import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { PokedexFormComponent } from 'src/app/shared/components/pokedex-form/pokedex-form.component';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { UserApi } from 'src/app/core/interfaces/user-api';
import { AuthService } from 'src/app/core/servicies/auth.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  pokedexFilter='';
  pokemons: Pokemon[] = [];
  idUser: number | null = null;
  deletionMode: boolean = false;
  constructor(
    protected pokemonSvc: PokemonService,
    private modalCtrl: ModalController,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.authSvc.me().subscribe((result: UserApi) => {
      var userId = result.id;
      this.idUser = userId;
      this.pokemonSvc.getTodo(userId).subscribe((result: PokemonApi) => {
        this.pokemons = result.data;
      });
    });
  }

  async onPlusClicked(pokemon?: Pokemon) {
    const modal = await this.modalCtrl.create({
      component: PokedexFormComponent,
      componentProps: {
        mode: pokemon ? 'Edit' : 'New',
        pkm: pokemon,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'New') {
      this.pokemonSvc.createOne(data, this.idUser!).subscribe((_) => {
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
  }
  onPokemonClicked(pokemon: Pokemon) {
    if (!this.deletionMode) {
      this.onPlusClicked(pokemon);
    } else {
      this.deletionMode = false;
      this.pokemonSvc.deleteOne(pokemon, this.idUser!).subscribe((_) => {
        this.pokemonSvc
          .getTodo(this.idUser!)
          .subscribe((result: PokemonApi) => {
            this.pokemons = result.data;
          });
      });  
    }
  }
  onMinusClicked() {
    this.deletionMode = true;
  }
}

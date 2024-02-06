import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { PokedexFormComponent } from 'src/app/shared/components/pokedex-form/pokedex-form.component';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(
    protected pokemonSvc: PokemonService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.pokemonSvc.getTodo().subscribe((result: PokemonApi) => {
      this.pokemons = result.data;
    });
  }

  async openModal(pokemon?: Pokemon) {
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
      this.pokemonSvc.createOne(data);
    }
    else if(role === 'Edit'){
      this.pokemonSvc.updateOne(data);
    }
  }
  onPokemonClicked(pokemon: Pokemon) {
    this.openModal(pokemon);
  }
}

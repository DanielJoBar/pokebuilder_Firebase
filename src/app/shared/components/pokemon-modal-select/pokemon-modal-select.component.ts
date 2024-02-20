import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { Attributes } from 'src/app/core/interfaces/pokemon-team';
import { SharedModule } from '../../shared.module';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-pokemon-modal-select',
  templateUrl: './pokemon-modal-select.component.html',
  styleUrls: ['./pokemon-modal-select.component.scss'],
})
export class PokemonModalSelectComponent implements OnInit {
  @Input() userId: number = -1;
  list: Pokemon[] = [];

  constructor(
    private pokemonSvc: PokemonService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.pokemonSvc.getTodo(this.userId).subscribe((result: PokemonApi) => {
      var listaApoyo: Pokemon[] = [];
      result.data.map((innerData: Pokemon) => {
        listaApoyo.push(innerData);
      });
      this.list = listaApoyo;
    });
  }
  onPokemonSelected(pokemon: Pokemon) {
    this.modalCtrl.dismiss(pokemon);
  }
  cancel() {
    this.modalCtrl.dismiss('');
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { PokedexFormComponent } from 'src/app/shared/components/pokedex-form/pokedex-form.component';
import { Pokemon, PokemonF } from 'src/app/core/interfaces/pokemon';
import { PokemonApi } from 'src/app/core/interfaces/pokemon-api';
import { UserApi } from 'src/app/core/interfaces/user-api';
import { AuthService } from 'src/app/core/servicies/auth.service';
import { FirebaseDocument, FirebaseService } from 'src/app/core/servicies/firebase.service';
import { DocumentData, doc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  pokedexFilter='';
  private pokemonList:BehaviorSubject<PokemonF[]> = new BehaviorSubject<PokemonF[]>([]);
  pokemonList$ = this.pokemonList.asObservable();

  pokemons: Pokemon[] = [];
  idUser: number | null = null;
  deletionMode: boolean = false;
  colection:string = "pokemon";
  constructor(
    protected pokemonSvc: PokemonService,
    private modalCtrl: ModalController,
    private authSvc: AuthService,
    private firebase:FirebaseService
  ) {
    this.init();
  }

  async init(){
    try {
      this.pokemonList$.subscribe(async (pokemonList: PokemonF[]) => {
        if (pokemonList.length > 0) {
          for (const pokemon of pokemonList) {
            const documentRef: FirebaseDocument = await this.firebase.getDocument(this.colection, pokemon.id);
            const mappedPokemon = this.firebase.mapPokemon(documentRef);
            this.firebase.subscribeToCollection(
              this.colection,
              this.pokemonList,
              (el:DocumentData)=>mappedPokemon
              );
          }
        }
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
    /*
    const documentRef = await this.firebase.getDocument(this.colection, this.pokemonList$);
    var mappedElement = this.firebase.mapPokemon(documentRef);
    this.firebase.subscribeToCollection(
      this.colection,
      this.pokemonList,
      (el:DocumentData)=>mappedElement
      );
    */
  }
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
      /*this.pokemonSvc.createOne(data, this.idUser!).subscribe((_) => {
        this.pokemonSvc
          .getTodo(this.idUser!)
          .subscribe((result: PokemonApi) => {
            this.pokemons = result.data;
          });
      });
      this.pokemonSvc.getTodo(this.idUser!).subscribe();*/
      var object = {
          name: data.attributes.name,
          hp: data.attributes.hp,
          atk: data.attributes.atk,
          def: data.attributes.def,
          speAtk: data.attributes.speAtk,
          speDef: data.attributes.speDef,
          speed: data.attributes.speed,
          bst: data.attributes.bst
      }
      await this.firebase.createDocument(this.colection,object);
    } else if (role === 'Edit') {
      /*this.pokemonSvc.updateOne(data, this.idUser!).subscribe((_) => {
        this.pokemonSvc
          .getTodo(this.idUser!)
          .subscribe((result: PokemonApi) => {
            this.pokemons = result.data;
          });
      });
      */
     var document = await this.firebase.getDocumentsBy(this.colection,"pokemon_id",data.pokemon_id);
     await this.firebase.updateDocument(this.colection,document[0].id,data)
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

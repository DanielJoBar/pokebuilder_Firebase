import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Pokemon } from 'src/app/core/interfaces/pokemon';
import { PokemonService } from 'src/app/core/servicies/pokemon.service';
@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent  implements OnInit {


  @Input() pokemon!:Pokemon;
  
  @Output() onPokemonClicked:EventEmitter<void> = new EventEmitter<void>()
  PokemonItemComponent(pokemonSvc:PokemonService){

  }
  ngOnInit() {
    
  }

  onPokemonClick(event:any){
    this.onPokemonClicked.emit(event);
    event.stopPropagation();
  }
 


}

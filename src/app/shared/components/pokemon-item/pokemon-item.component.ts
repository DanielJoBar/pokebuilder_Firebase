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


  @Input() pokemon:Pokemon={
    id: 0,
    name: 'ninguno',
    hp: 0,
    atk: 0,
    def: 0,
    speAtk: 0,
    speDef: 0,
    speed: 0,
    bst:0
  }
  @Output() onPokemonClicked:EventEmitter<void> = new EventEmitter<void>()
  ngOnInit() {
    
  }

  onPokemonClick(event:any){
    this.onPokemonClicked.emit(event);
    event.stopPropagation();
  }
 


}

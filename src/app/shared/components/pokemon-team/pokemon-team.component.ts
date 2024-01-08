import { Component, Input, OnInit } from '@angular/core';
import { PokemonTeam, TeamData } from 'src/app/core/interfaces/pokemon-team';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss'],
})
export class PokemonTeamComponent  implements OnInit {

  @Input() team:TeamData|null=null;
  constructor() { }

  ngOnInit() {}

}

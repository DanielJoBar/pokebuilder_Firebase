import { Component, OnInit } from '@angular/core';
import { PokemonTeamService } from 'src/app/core/servicies/pokemon-team.service';
import { UserService } from 'src/app/core/servicies/user.service';

@Component({
  selector: 'app-team-builder',
  templateUrl: './team-builder.page.html',
  styleUrls: ['./team-builder.page.scss'],
})
export class TeamBuilderPage implements OnInit {

  constructor(protected teamScv:PokemonTeamService,private userSvc:UserService) { }

  ngOnInit() {
    this.teamScv.getAll(16).subscribe;
  }

}

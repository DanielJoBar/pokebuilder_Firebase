import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from 'src/app/core/interfaces/user-api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isLoginPage(): boolean {
    return this.router.url.includes('login');
  }
  onPokedexClick(){
    this.router.navigate(['/pokedex'])
  }
  onTeamClick(){
    this.router.navigate(['/team-builder'])
  }
  onAboutClick(){
    this.router.navigate(['/about'])
  }
}

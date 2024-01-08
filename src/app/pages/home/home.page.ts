import { Component } from '@angular/core';
import { AuthService } from '../../core/servicies/auth.service';
import { UserService } from '../../core/servicies/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private users:UserService,private auth:AuthService) {}
  ngOnInit(): void {
    
  }
}

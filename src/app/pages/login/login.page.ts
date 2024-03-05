import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/core/interfaces/user-data';
import { AuthService } from 'src/app/core/servicies/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private author:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  onLogin(credentialsData:UserData){
    this.author.logIn(credentialsData).subscribe({
      next:data=>{
        this.router.navigate(['home'])
      },
      error:err=>{
        console.log("Eror en el inicio de sesion, no existe el usuario",err)
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/interfaces/user-credentials';
import { UserRegisterInfo } from 'src/app/core/interfaces/user-register-info';
import { AuthStrapiService } from 'src/app/core/servicies/auth-strapi.service';
import { AuthService } from 'src/app/core/servicies/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private redirectUrl:string ="";
  constructor(private author: AuthService,private route:ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.author.isLogged$.subscribe(user=>{
        if(user){
          this.router.navigate(['home'])
        }
    })
  }
  onLogin(credentialsData: UserCredentials) {
    this.author.login(credentialsData).subscribe({
      next:data => {
        this.router.navigate(['home']);
      },
      error:err => {
        console.log('Eror en el inicio de sesion, no existe el usuario', err);
      },
    });
  }
  onRegister(credentialsData: UserRegisterInfo) {
    this.author.register(credentialsData).subscribe({
      next: (data) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log('Eror en el registro , ya existe el usuario', err);
      },
    });
  }
}

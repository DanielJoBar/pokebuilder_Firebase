import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, map, tap } from 'rxjs';
import { UserCredentials } from '../interfaces/user-credentials';
import { UserRegisterInfo } from '../interfaces/user-register-info';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import {
  StrapiExtendedUser,
  StrapiLoginPayload,
  StrapiLoginResponse,
  StrapiRegisterPayload,
  StrapiRegisterResponse,
  StrapiUser,
} from '../interfaces/strapi';
import { User } from '../interfaces/user';
import { UserApi } from '../interfaces/user-api';

@Injectable({
  providedIn: 'root',
})
export class AuthStrapiService extends AuthService {
  constructor(private jwtSvc: JwtService, private apiSvc: ApiService) {
    super();
    this.init();
  }

  private init() {
    this.jwtSvc.loadToken().subscribe((token) => {
      if(token){
        this.me().subscribe(userMe=>{
          this._isLogged.next(true);
          this._user.next(userMe);
        })
      }else{
        this._isLogged.next(false);
        this._user.next(null);
      }
    });
  }

  public login(credentials: UserCredentials): Observable<void> {
    return new Observable<void>((obs) => {
      const _credentials: StrapiLoginPayload = {
        identifier: credentials.username,
        password: credentials.password,
      };
      this.apiSvc.post('/auth/local', _credentials).subscribe({
        next: async (data: StrapiLoginResponse) => {
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          let connected = data && data.jwt != '';
          this._isLogged.next(connected);
          obs.next();
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }

  logout(): Observable<void> {
    return this.jwtSvc.destroyToken().pipe(
      map((_) => {
        return;
      })
    );
  }

  register(info: UserRegisterInfo): Observable<void> {
    return new Observable<void>((obs) => {
      const _userInfo: StrapiRegisterPayload = {
        username: info.username,
        password: info.password,
        email: info.email,
      };
      this.apiSvc.post('/auth/local/register', _userInfo).subscribe({
        next: async (data: StrapiRegisterResponse) => {
          let connected = data && data.jwt != '';
          this._isLogged.next(connected);
          await lastValueFrom(this.jwtSvc.saveToken(data.jwt));
          const _extended_user: StrapiExtendedUser = {
            data: {
              name: info.name,
              surname: info.surname,
              user_id: data.user.id,
              user: data.user.id,
            },
          };
          await lastValueFrom(
            this.apiSvc.post('/extended-users', _extended_user)
          );
          obs.next();
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }

  public me(): Observable<UserApi> {
    return new Observable<UserApi>((obs) => {
      this.apiSvc.get('/users/me').subscribe({
        next: async (user: StrapiUser) => {
          let extended_user = await lastValueFrom(
            this.apiSvc.get(`/extended-users?filters[user_id]=${1}`)
          );
          let ret: UserApi = {
            id: user.id,
            username: user.username,
            email: user.email,
          };
          obs.next(ret);
          obs.complete();
        },
        error: (err) => {
          obs.error(err);
        },
      });
    });
  }
}

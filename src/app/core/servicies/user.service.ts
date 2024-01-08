import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserApi } from '../interfaces/user-api';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private apiSvc:ApiService
  ){}

  private _users:BehaviorSubject<UserApi> = new BehaviorSubject<UserApi>({id:0,email:"",username:""});
  public users$:Observable<UserApi> = this._users.asObservable();
  
  /*
  public addUser(user:User):Observable<User>{
    return this.apiSvc.post("/extended-users", user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
  }
  */
/*
  public getAll():Observable<UserApi[]>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.apiSvc.get(`/users`).pipe(map(
      (users:any[])=>{
        return users.map((user:UserApi)=>{
          return{
            id:user.id,
            email:user.email,
            username:user.username
          }
        })
      }
      ),tap(users=>{
      this._users.next(users);
    }));
  }
*/
  public getUser():UserApi{
    return this._users.getValue()
  }
/*
  public updateUser(user:User):Observable<UserApi>{ 
  }
  public deleteUser(user:User):Observable<UserApi>{
  }
  */
}

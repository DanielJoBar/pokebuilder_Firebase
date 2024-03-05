import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserApi } from '../interfaces/user-api';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthService {
  constructor() {}
  //Necesito un behaviour subject para almacenar si el ususario está loggeado
  protected _isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  ); //Se pone por defeto a false
  isLogged$ = this._isLogged.asObservable();
  protected _user = new BehaviorSubject<UserApi|null>(null);
  public user$ = this._user.asObservable();
  //Un servicio de autor necesita distintos métodos
  /**
   * Busca a un usuario con las credenciales recibidas
   * en la base de datos y emite un observable de cualquier tipo
   * @param credenciales
   */
  public abstract login(credenciales: Object): Observable<any>;
  /**
   * Cierra la sesión del usuario, no devuelve nada
   */
  public abstract logout(): Observable<void>;
  /**
   * Crea un nuevo usuario en la base de datos,
   * requiere de los datos de un formulario para enviarlos por un
   * observable de cualquier tipo
   * @param data
   */
  public abstract register(data: Object): Observable<any>;

  /**
   * Obtiene los datos del usuario loggeado y emite un observable de cualquier tipo
   */
  public abstract me(): Observable<any>;
}

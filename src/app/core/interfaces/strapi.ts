//Interfaz del usuario de Strapi
export interface StrapiUser {
    id: number;
    username: string;
    email: string;
  }
  //Interfaz para la identificar al usuario que se esta logando
  export interface StrapiLoginPayload {
    identifier: string;
    password: string;
  }
  //Interfaz para recoger los datos del usuario que se etá registrando
  export interface StrapiRegisterPayload {
    email: string;
    password: string;
    username: string;
  }
  //Interfaz para la respuesta de login de strapi
  export interface StrapiLoginResponse {
    //Tokken que proporciona al usuario logado único
    jwt: string;
    //Usuario que ha iniciado sesión
    user: StrapiUser;
  }
  //Interfaz para la respuesta de register de strapi
  export interface StrapiRegisterResponse {
    jwt: string;
    user: StrapiUser;
  }
  //Interfaz para los datos adicionales del usuario que ha logado
  export interface StrapiExtendedUser {
    data: {
      name: string;
      surname: string;
      user_id: number;
      user:number;
    };
    //name:string,
    //surname:string,
    //user_id:number,
    //url del perfil del usuario
    //picture?:string
  }
  
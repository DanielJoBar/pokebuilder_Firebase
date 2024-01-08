import { User } from "./user"

export interface PokemonApi{
    data:[
        {
            id:number,
            attributes:{
                pokedexId: number,
                name: string,
                hp: number,
                atk: number,
                def: number,
                speAtk: number,
                speDef: number,
                speed: number,
                bst: number,
            }
            user?:User
        }
    ]
}
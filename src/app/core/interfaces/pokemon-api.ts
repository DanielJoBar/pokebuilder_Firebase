import { User } from "./user"

export interface PokemonApi{
    data:[
        {
            pokedexId: string,
            name: string,
            hp: number,
            atk: number,
            def: number,
            speAtk: number,
            speDef: number,
            speed: number,
            bst: number,
        }
    ]
}
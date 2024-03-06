export interface Pokemon {
    id: number;
    attributes: {
      name: string;
      image?: string;
      icon?: string;
      hp?: number;
      atk?: number;
      def?: number;
      speAtk?: number;
      speDef?: number;
      speed?: number;
      bst?: number;
    }
  }
export  interface PokemonF{
  id:string;
  name: string;
  image?: string;
  icon?: string;
  hp?: number;
  atk?: number;
  def?: number;
  speAtk?: number;
  speDef?: number;
  speed?: number;
  bst?: number;
}
  
interface Ability {
  name: string;
}

export interface PokemonType {
  name: string;
  height: number;
  weight: number;
  abilities: { 
    ability: Ability;
    is_hidden: boolean 
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  }
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonCategory {
  name: string;
}
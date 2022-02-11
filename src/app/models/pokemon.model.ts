export interface Pokemon{
    id: number;
    name: string;
}

export interface PokemonById{
    id: number;
    name: string;
    description: string;
    height: number;
    weight: number;
    types: string[];
}

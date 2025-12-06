export interface Pokemon {
    name: string;
    url: string;
    sprit: string;
} //interface de um pokemon com dados que serao usados 

export interface PokemonDetail extends Pokemon {
  id: number;
  types: string[]; // Ex: ["fire", "flying"]
  stats: {
    name: string;
    value: number;
  }[];
}//Dados a mais que serão utilizados
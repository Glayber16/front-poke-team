import React from "react";
import { PokeCard } from "@/components/PokeCard";
import {Pokemon} from "@/types/pokemon";
async function getPokes(): Promise<Pokemon[]>{
  try{
    const res = await fetch('http://localhost:3000/pokemons');
    if(!res.ok){
      throw new Error('Falha ao buscar dado')
    }
    return res.json();
  }
  catch(error){
    console.error(error);
    return [];
  }
}




export default async function Home() {

  const pokemons = await getPokes();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Gerenciador de Times Pokémon</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-4">
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.name} 
            pokemon={pokemon}
          />
        ))}
      </div>
    </main>
  );
}
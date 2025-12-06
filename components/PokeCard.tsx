
import { Pokemon, PokemonDetail } from "@/types/pokemon";
const typeColors: Record<string, string> = {
  fire: "bg-red-500 border-red-500 text-white",
  water: "bg-blue-500 border-blue-500 text-white",
  grass: "bg-green-500 border-green-500 text-white",
  electric: "bg-yellow-400 border-yellow-400 text-black", 
  ice: "bg-cyan-300 border-cyan-300 text-black",
  fighting: "bg-orange-700 border-orange-700 text-white",
  poison: "bg-purple-500 border-purple-500 text-white",
  ground: "bg-yellow-600 border-yellow-600 text-white",
  flying: "bg-indigo-400 border-indigo-400 text-white",
  psychic: "bg-pink-500 border-pink-500 text-white",
  bug: "bg-lime-500 border-lime-500 text-white",
  rock: "bg-stone-500 border-stone-500 text-white",
  ghost: "bg-violet-700 border-violet-700 text-white",
  dragon: "bg-indigo-600 border-indigo-600 text-white",
  steel: "bg-slate-400 border-slate-400 text-white",
  fairy: "bg-pink-300 border-pink-300 text-black",
  normal: "bg-gray-400 border-gray-400 text-white",
};

function isDetail(pokemon: Pokemon): pokemon is PokemonDetail {
  return (pokemon as PokemonDetail).stats !== undefined;
}


export function PokeCard({pokemon}: {pokemon : Pokemon}){ //Componente recebe um pokemon como prop
    return(
        <div className="flex flex-col items-center justify-center border rounded-lg shadow-lg hover:scale-105 bg-white text-gray-800">
            <div className=" flex border-b w-full items-center justify-center py-2">
                <h2><strong>{pokemon.name}</strong></h2> 
            </div>
            <div className="flex flex-col items-center justify-center p-4 gap-4">
                <img src={pokemon.sprit} alt={pokemon.name} className="h-30 w-30"/>
                
            </div>
           {isDetail(pokemon) && (
                <div className="mt-3 w-full border-t pt-2 flex items-center justify-center flex-col">
          
          
                <div className="flex gap-1 justify-center mb-2 gap-2">
                    {pokemon.types.map(t => (
                    <p key={t} className={`px-2 py-1  text-xs  rounded-full capitalize ${typeColors[t]}`}>
                        {t}
                    </p>
                    ))}
                </div>

                
                 <div className="mt-4 space-y-2 text-sm">
                        {pokemon.stats.map(stat => (
                            <div key={stat.name} className="flex items-center justify-between gap-2">
                                <span className="w-20 font-bold text-gray-500 uppercase text-xs">{stat.name}</span>                            
                                <span className="font-mono text-gray-700">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
//Componente exibe um pokemon dentro de um card com nome, imagem e um botão para adicionar ao time
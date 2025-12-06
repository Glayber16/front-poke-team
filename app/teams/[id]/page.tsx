
import { Team } from "@/types/team";
import { Pokemon, PokemonDetail } from "@/types/pokemon";
import Link from "next/link";
import { PokeCard } from "@/components/PokeCard";


async function getTeamById(id: string): Promise<Team | null> {
  try{
    const res = await fetch(`http://localhost:3000/teams/${id}`)
    if(!res.ok){
      return null;
    }
    return res.json();
  }
  catch(error){
    return null;
  }
  
}

async function getPokemonDetails(name: string): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`http://localhost:3000/pokemons/${name}`)
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
}



export default async function TeamDetails(props: { params: Promise<{ id: string }> }) {

  const { id } = await props.params;
  const team = await getTeamById(id);
  
  if(team == null){
    return(
      <div>
        Time não encontrado! 
     </div>
    )
    
  }
  const detailedPokemons = await Promise.all(
    team.pokemons.map(async (simplePoke) => {
      const details = await getPokemonDetails(simplePoke.name);
      return details; 
    })
  );
  return(
    <main className="flex min-h-screen flex-col items-center p-8 bg-[#101622]">
      
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 text-white">
        <h1 className="text-4xl font-bold capitalize">{team.name}</h1>
        <Link href="/teams" className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">Voltar</Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {detailedPokemons.map((pokemon) => {
            
            if (!pokemon) return null; 

            return (
              <div key={pokemon.id} className="flex flex-col ">
                <PokeCard
                 key={pokemon.name} 
                 pokemon={pokemon}
                  />
                  
              </div>
                
                  
              );
        })}
      </div>
    </main>
    
  ) 
  
}

//Pagina com os detalhes dos times especifico
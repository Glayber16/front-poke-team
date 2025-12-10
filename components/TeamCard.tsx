"use client"
import { Team } from "@/types/team"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export function TeamCard({team}: {team: Team}){
    const [isOpen, setIsOpen] = useState(false);
    const [pokemonName, setPokemonName] = useState("");
    const [isMine, setIsMine] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem('my_teams') || '[]');
        if(savedIds.includes(team.id)){
            setIsMine(true);
        }
    }, [team.id])

    async function addPoke(){
        if(!pokemonName){
            return;
        }
        if(isMine == false){
            alert("Você não pode adicionar pokemon ao time de outra pessoa!!");
            return;
        }

        try{
            const res = await fetch(`http://localhost:3000/teams/${team.id}/pokemon`, {
                method: "POST",
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({pokemonName: pokemonName})
            })
            if(res.ok){
                alert(`${pokemonName} adicionado`)
                setIsOpen(false)
                setPokemonName("");
                router.refresh();
            }
            else{
                alert("Error: verifique o nome ou se o time já tem 6 pokemons")
            }
        }
        catch(error){
            console.log(error)
        }
    }
    async function removeTeam(id : string){
        if(isMine == false){
            alert("Você não pode deletar o time de outra pessoa!!");
            return;
        }
        try{
            const res = await fetch(`http://localhost:3000/teams/${id}`,{
                method: "DELETE",
            })
        if(!res.ok){
            return null
        }
        alert("Time deletado")
        router.refresh();
        }

        catch(error){
        console.log(error)
        }
    }

    async function removePokemon(id: string, name:string){
         if(isMine == false){
            alert("Você não pode remover pokemon do time de outra pessoa!!");
            return;
        }
        try {
            const res = await fetch(`http://localhost:3000/teams/${id}/pokemon/${name}`, {
            method: "DELETE"
            })
            if (!res.ok) {
                return null;
            }
            router.refresh()
        }
        catch(error){
            console.log(error)
        }
    }
    

    return(
        <>
        <div className="flex flex-col items-center justify-center gap-5 py-5 border rounded-lg shadow-lg hover:scale-105 bg-white">
            {isMine && (
                <span className="  bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    MEU
                </span>
            )}
            {!isMine && (
                <span className="  bg-white text-black border border-black text-xs px-2 py-1 rounded-full">
                    OUTRO
                </span>
            )}
            <Link href={`/teams/${team.id}`} className="bg-black text-white rounded p-2">Detalhes do time</Link>
            <div>
                <h2><strong>{team.name} </strong></h2>
                <p className="text-sm text-gray-500 mb-2">Pokémons: {team.pokemons.length}/6</p>
            </div>
            <div>
                <ul>
                    <h2 className="border-b ">Pokemons:</h2>
                    {team.pokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        {pokemon.name} 
                        {isMine && (
                            <button className="bg-red-500 rounded m-2 px-1 cursor-pointer" onClick={() => removePokemon(team.id, pokemon.name)}>Deletar</button>
                        )}
                        </li>
                ))}
                </ul>
            </div>
             {isMine && (
                <div className="flex flex-col gap-5 ">
                    <button onClick={() => setIsOpen(true)} className="bg-blue-500 h-10 cursor-pointer rounded px-2">Adicionar pokemon</button>
                    <button onClick={() => removeTeam(team.id)} className="bg-red-500 cursor-pointer rounded p-2">Deletar time</button>
                </div>
                
            )}
        </div>

        {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" >
                <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
                   <h3 className="font-bold text-lg mb-4">Adicionar ao time {team.name}</h3>
                   <input 
                        type="text"
                        placeholder="Nome do Pokémon (ex: gengar)"
                        className="border w-full p-2 rounded mb-4"
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value)}
                    />
                    <div className="flex justify-between gap-2">                  
                        <button onClick={addPoke} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                            Salvar
                        </button>

                        <button onClick={() => setIsOpen(!isOpen)} className="text-black px-3 py-1 bg-red-500 hover:bg-red-700 rounded">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}// Card para os times, com o nome do time e dos pokemons, idealmente seria apresentar uma pequena sprite, por enquanto vai ser o nome
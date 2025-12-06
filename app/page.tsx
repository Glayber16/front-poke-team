'use client'
import { useEffect, useState } from "react";
import { PokeCard } from "@/components/PokeCard";
import {Pokemon} from "@/types/pokemon";
import PokeNav from "@/components/PokeNav";

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
const types = Object.keys(typeColors);

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

async function searchPokes(name: string): Promise<Pokemon | null> {
  try{
    const res = await fetch(`http://localhost:3000/pokemons/${name}`)
    if(!res.ok){
      return null
    }
    return res.json();

  }
  catch(error){
    console.error(error);
    return null
  }
}




export default  function Home() {
  const [typeButton, setTypeButton] = useState("")
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    
    async function loadInitialData() {
        const data = await getPokes();
        setPokemons(data); 
    }
    loadInitialData(); 
  }, []);

  async function handleFilterType(type: string){
    if(typeButton === type || type === ""){
      setTypeButton("");
      const data = await getPokes();
      setPokemons(data)
      return;
    }
    setTypeButton(type)
    try{
      const res = await fetch(`http://localhost:3000/pokemons/type/${type}`)
      const data = await res.json();
      setPokemons(data);
    }
    catch(error){
      console.log(error)
    }
  }


  async function handleSearch() {
    const result = await searchPokes(searchTerm);
    if(result){
      setPokemons([result])
    }
    else{
      alert("Pokemon não encontrado");
      setPokemons([])
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 bg-[#101622]  ">
     <PokeNav/>
      <div className="p-24 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Gerenciador de Times Pokémon</h1>
        <div className="flex w-full max-w-md gap-2 m-8">
          <input 
          type="text" 
          aria-label="Buscar Pokémon"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar pokemon pelo nome..."
          className="flex-1 border p-2 rounded text-white"
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            buscar
          </button>
        </div>
      
      <div className="mb-8 w-full max-w-7xl">
        <p className="mb-2 font-bold text-gray-500">Filtrar por tipo:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <button onClick={() =>handleFilterType("")} className={`px-3 py-1 rounded-full border transition-all ${  typeButton === "" 
          ? "bg-blue-600 text-white border-blue-600"  : "bg-transparent text-gray-400 border-gray-600 hover:bg-gray-800" }`}>
            Todos
          </button>
          {types.map((type) => {
            const isActive = typeButton === type;
            const colorClass = isActive 
                ? typeColors[type] 
                : `bg-transparent text-gray-400 border-gray-600 hover:bg-gray-800 `;

            return (
                <button 
                    key={type} 
                    onClick={() => handleFilterType(type)} 
                    className={`px-3 py-1 rounded-full border capitalize transition-all font-medium ${colorClass}`}>
                    {type}
                </button>
            );
          })}
       </div>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  w-full p-4">
        {pokemons.map((pokemon) => (
          <PokeCard
            key={pokemon.name} 
            pokemon={pokemon}
          />
        ))}
      </div>
      </div>
      
      
    </main>
  );
}
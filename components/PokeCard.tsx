import { Pokemon } from "@/types/pokemon";

export function PokeCard({pokemon}: {pokemon : Pokemon}){ //Componente recebe um pokemon como prop
    return(
        <div className="flex flex-col items-center justify-center border rounded-lg shadow-lg hover:scale-105">
            <div className=" flex border-b w-full items-center justify-center py-2">
                <h2><strong>{pokemon.name}</strong></h2> 
            </div>
            <div className="flex flex-col items-center justify-center p-4 gap-4">
                <img src={pokemon.sprit} alt={pokemon.name} className="h-30 w-30"/>
                
            </div>
           
        </div>
    )
}
//Componente exibe um pokemon dentro de um card com nome, imagem e um botão para adicionar ao time
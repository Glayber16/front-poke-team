import { Team } from "@/types/team"

export function TeamCard({team}: {team: Team}){
    return(
        <div className="flex flex-col items-center justify-center border rounded-lg shadow-lg hover:scale-105">
            <div>
                <h2><strong>{team.name} </strong></h2>
            </div>
            <div>
                <ul>Pokemons: {team.pokemons.map((pokemon) => (
                    <li key={pokemon.id}>
                        {pokemon.name}
                    </li>
                ))}</ul>
            </div>

        </div>
    )
}// Card para os times, com o nome do time e dos pokemons, idealmente seria apresentar uma pequena sprite, por enquanto vai ser o nome
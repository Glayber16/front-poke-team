import { TeamCard } from "@/components/TeamCard";
import { Team } from "@/types/team";
async function getTeams(): Promise<Team[]>{
    try{
        const res = await fetch('http://localhost:3000/teams') //Contacta a Api para ver quais times existem (no momento não tem persistencia de dados)
        if(!res.ok){
            throw new Error('Falha ao buscar times')
        }
        return res.json();
    }
    catch(error){
        console.error(error);
        return [];
    }
}




export default async function TeamsPage() {
    const teams = await getTeams();
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Meus Times</h1>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-4">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id} 
                    team={team}
                  />
                ))}
              </div>
      </div>
    </main>
  );
} //Pagina simples retornando os times parecido com a home
import { CreateTeam } from "@/components/CreateTeam";
import PokeNav from "@/components/PokeNav";
import { TeamCard } from "@/components/TeamCard";
import { Team } from "@/types/team";

async function getTeams(): Promise<Team[]>{
    try{
        
        const res = await fetch('http://localhost:3000/teams', { cache: 'no-store' }) 
        
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
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      <PokeNav/>
      <div className="w-full max-w-6xl p-8 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Meus Times</h1>
          
          
          <div className="mb-10 p-6 bg-white rounded-lg flex flex-col items-center shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Criar Novo Time</h2>
            <CreateTeam/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id} 
                    team={team}
                  />
                ))}
          </div>

          {teams.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                  Nenhum time criado ainda
              </p>
          )}
      </div>
    </main>
  );
}
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
export function CreateTeam(){
    const[name, setName] = useState('');
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(!name.trim()){
            return;
        }
        try{
            const response = await fetch('http://localhost:3000/teams',{
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({name})
            }) 
            if(response.ok){
                setName('');
                router.refresh();
                alert("Time criado com sucesso!");
            }
        }
        catch(error){
            alert("Erro ao criar time");
        }
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Nome do time"
                className="border p-2 rounded text-black"
                />
                <button type="submit" className="rounded px-4 py-2 bg-green-500 cursor-pointer">Criar time!!</button>
            </form>
        </div>
    )
}
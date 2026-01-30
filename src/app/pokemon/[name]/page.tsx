"use client";

import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { PokemonStatsTable } from "@/components/PokemonStatsTable";


export default function PokemonProfile() {
  const { name } = useParams();
  const router = useRouter();
  const { pokemon, loading, isCaught, toggleCatch } = usePokemonDetails(name as string);

  if (loading || !pokemon) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Header />
      
      <main className="flex justify-center py-16 px-4">
        <div className="w-200 max-w-full">
          
          <button 
            onClick={() => router.back()} 
            className="mb-6 text-xs font-bold text-gray-500 hover:text-black flex items-center gap-2 uppercase tracking-widest"
          >
            ← BACK TO SEARCH
          </button>

          <div className="flex flex-row items-start gap-8">
            
            <div 
              className={`shrink-0 bg-white border-[5px] flex items-center justify-center rounded-sm transition-colors duration-200 w-70 h-70 ${
                isCaught ? 'border-poke-yellow' : 'border-gray-200'
              }`}
            >
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="w-full h-full object-contain p-6" 
              />
            </div>

            <div className="flex-1 flex flex-col justify-between min-h-70">
              
              <PokemonStatsTable pokemon={pokemon} isCaught={isCaught} />

              <button 
                onClick={() => toggleCatch(pokemon.name)}
                className={`w-full py-3 rounded-md font-bold text-white text-sm uppercase tracking-wider transition-colors shadow-sm mt-4 ${
                  isCaught 
                    ? "bg-poke-yellow hover:bg-yellow-500"
                    : "bg-poke-blue hover:bg-blue-600"
                }`}
              >
                {isCaught ? "RELEASE" : "CATCH"}
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
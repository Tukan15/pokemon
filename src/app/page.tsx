"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePokemon } from "@/hooks/usePokemon";
import { usePokemonContext } from "@/context/PokemonContext";
import { Header } from "@/components/Header";

export default function Home() {
  const router = useRouter();
  
  const {
    types,
    filteredPokemons,
    selectedType,
    searchQuery,
    setSearchQuery,
    isLoadingTypes,
    isLoadingPokemons,
    handleTypeChange,
  } = usePokemon();

  const { caughtPokemonNames, toggleCatch } = usePokemonContext();

  const [showOnlyCaught, setShowOnlyCaught] = useState(false);

  const handlePokemonClick = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

  const displayPokemons = filteredPokemons.filter((pokemon) => {
    if (showOnlyCaught) {
      return caughtPokemonNames.includes(pokemon.name);
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-black">
      <Header />

      <main className="max-w-7xl mx-auto w-full py-16 px-12 flex flex-col md:flex-row gap-24">
        
        <aside className="w-full md:w-64 space-y-12">
          <section>
            <h2 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6 italic">Filters</h2>
            <div className="relative border-b border-gray-200 pb-2 flex items-center">
              <span className="mr-2 opacity-40">🔍</span>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none text-sm placeholder-gray-300 bg-transparent text-black"
              />
            </div>
          </section>

          <section>
            <label className="block text-gray-700 font-bold text-[11px] mb-3 uppercase tracking-tighter">
              Pokemon Types
            </label>
            <div className="relative border border-gray-200 rounded-md">
              <select 
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full p-3 pr-10 text-sm text-gray-500 bg-white rounded-md appearance-none outline-none focus:ring-1 focus:ring-poke-blue"
              >
                <option value="">{isLoadingTypes ? "Loading..." : "Select..."}</option>
                {types.map((type) => (
                  <option key={type.name} value={type.name} className="capitalize">
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                ▼
              </div>
            </div>
          </section>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="caught" 
              checked={showOnlyCaught}
              onChange={() => setShowOnlyCaught(!showOnlyCaught)}
              className="w-4 h-4 rounded border-gray-300 accent-poke-blue cursor-pointer shadow-sm" 
            />
            <label htmlFor="caught" className="text-xs font-semibold text-gray-600 cursor-pointer select-none">
              Only show caught Pokemon
            </label>
          </div>
        </aside>

        <section className="flex-1">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_120px] px-8 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span>Name</span>
            <span>Type</span>
            <span>Status</span>
            <span></span>
          </div>

          {isLoadingPokemons ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-poke-red"></div>
              <p className="text-gray-400 text-sm font-medium">Fetching Pokemons...</p>
            </div>
          ) : displayPokemons.length > 0 ? (
            <div className="flex flex-col gap-4">
              {displayPokemons.map((pokemon) => {
                const isCaught = caughtPokemonNames.includes(pokemon.name);
                
                return (
                  <div 
                    key={pokemon.name} 
                    onClick={() => handlePokemonClick(pokemon.name)}
                    className={`grid grid-cols-[1.5fr_1fr_1fr_120px] items-center border rounded-xl p-3 pl-8 shadow-sm transition-all cursor-pointer ${
                      isCaught 
                        ? "border-poke-yellow bg-white" 
                        : "border-gray-100 hover:border-poke-blue/30"
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-700 capitalize">
                      {pokemon.name}
                    </span>
                    <span className="text-sm text-gray-400 capitalize">
                      {selectedType || "---"}
                    </span>
                    <span className={`text-sm ${isCaught ? "text-poke-yellow italic font-bold" : "text-gray-300"}`}>
                      {isCaught ? "Caught" : "-"}
                    </span>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCatch(pokemon.name);
                      }}
                      className={`text-[13px] py-2 px-6 rounded-md font-bold transition-all ${
                        isCaught 
                          ? "bg-poke-yellow text-white hover:bg-yellow-600" 
                          : "bg-poke-blue text-white hover:brightness-105"
                      }`}
                    >
                      {isCaught ? "Release" : "Catch"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
              <p className="text-gray-400 italic text-sm">
                {selectedType 
                  ? "No pokemons found." 
                  : "Please select a type to list Pokemons."}
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
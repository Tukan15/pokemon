import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "@/services/pokemonService";
import { usePokemonContext } from "@/context/PokemonContext";
import { PokemonType } from "@/types/pokemon";

export const usePokemonDetails = (name: string) => {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [loading, setLoading] = useState(true);
  
  const { caughtPokemonNames, toggleCatch } = usePokemonContext();

  const isCaught = caughtPokemonNames.includes(name);

  useEffect(() => {
    const getDetails = async () => {
      if (!name) return;
      try {
        const data = await fetchPokemonDetails(name);
        setPokemon(data);
      } catch (error) {
        console.error("Fetching error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getDetails();
  }, [name]);

  return {
    pokemon,
    loading,
    isCaught,
    toggleCatch
  };
};
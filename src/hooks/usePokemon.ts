import { useState, useEffect } from "react";
import { fetchPokemonTypes, fetchPokemonsByType } from "@/services/pokemonService";
import { usePokemonContext } from "@/context/PokemonContext";
import { PokemonType, PokemonCategory } from "@/types/pokemon";

export const usePokemon = () => {
  const [types, setTypes] = useState<PokemonCategory[]>([]);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(false);

  const { 
    selectedType, 
    setSelectedType, 
    searchQuery, 
    setSearchQuery 
  } = usePokemonContext();

  useEffect(() => {
    const getTypes = async () => {
      try {
        const results = await fetchPokemonTypes();
        setTypes(results);
      } catch (error) {
        console.error("Failed to load types:", error);
      } finally {
        setIsLoadingTypes(false);
      }
    };
    getTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      if (!selectedType) {
        setPokemons([]);
        return;
      }

      setIsLoadingPokemons(true);
      try {
        const pokemonList = await fetchPokemonsByType(selectedType);
        setPokemons(pokemonList);
      } catch (error) {
        console.error("Failed to load pokemons:", error);
      } finally {
        setIsLoadingPokemons(false);
      }
    };

    fetchPokemons();
  }, [selectedType]);

  const handleTypeChange = (typeName: string) => {
    setSelectedType(typeName);
  };

  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    types,
    filteredPokemons,
    selectedType,
    searchQuery,
    setSearchQuery,
    isLoadingTypes,
    isLoadingPokemons,
    handleTypeChange,
  };
};
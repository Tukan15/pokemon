import { useState, useEffect } from "react";
import { fetchPokemonTypes, fetchPokemonsByType } from "@/services/pokemonService";
import { usePokemonContext } from "@/context/PokemonContext";

export const usePokemon = () => {
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(false);

  const { 
    selectedType, 
    setSelectedType, 
    searchQuery, 
    setSearchQuery,
    pokemons,
    setPokemons,
    loadedType,
    setLoadedType,
    types,
    setTypes   
  } = usePokemonContext();

  useEffect(() => {
    const getTypes = async () => {
      if (types.length > 0) {
        setIsLoadingTypes(false);
        return;
      }
      
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
        setLoadedType("");
        return;
      }
      if (pokemons.length > 0 && loadedType === selectedType) {
        return; 
      }
      setIsLoadingPokemons(true);
      try {
        const pokemonList = await fetchPokemonsByType(selectedType);
        setPokemons(pokemonList);
        setLoadedType(selectedType);
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
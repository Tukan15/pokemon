"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { PokemonCategory, PokemonType } from "@/types/pokemon";

interface PokemonContextType {
  caughtPokemonNames: string[];
  toggleCatch: (name: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pokemons: PokemonType[];
  setPokemons: (data: PokemonType[]) => void;
  loadedType: string;
  setLoadedType: (type: string) => void;
  types: PokemonCategory[];
  setTypes: (data: PokemonCategory[]) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const [caughtPokemonNames, setCaughtPokemonNames] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loadedType, setLoadedType] = useState<string>("");
  
  const [types, setTypes] = useState<PokemonCategory[]>([]);

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("caughtPokemons");
    if (saved) {
      setCaughtPokemonNames(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("caughtPokemons", JSON.stringify(caughtPokemonNames));
    }
  }, [caughtPokemonNames, isInitialized]);

  const toggleCatch = (name: string) => {
    setCaughtPokemonNames((prev) => 
      prev.includes(name) 
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  return (
    <PokemonContext.Provider value={{ 
      caughtPokemonNames, 
      toggleCatch,
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
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};
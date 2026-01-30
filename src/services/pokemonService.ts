import { PokemonType, PokemonCategory } from "@/types/pokemon";

export const fetchPokemonTypes = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type");
  if (!response.ok) throw new Error("Fetching error");
  const data = await response.json();
  return data.results as PokemonCategory[];
};

export const fetchPokemonsByType = async (typeName: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
  if (!response.ok) throw new Error("Fetching error");
  const data = await response.json();
  return data.pokemon.map((p: { pokemon: PokemonType }) => p.pokemon) as PokemonType[]; 
};

export const fetchPokemonDetails = async (name: string): Promise<PokemonType> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error("Failed to fetch pokemon details");
  return await response.json();
};
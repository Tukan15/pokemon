import { PokemonType } from "@/types/pokemon";

export const PokemonStatsTable = ({ pokemon, isCaught }: { pokemon: PokemonType; isCaught: boolean }) => {
  return (
    <div className="w-full border border-gray-200 rounded-sm overflow-hidden shadow-sm">
      <table className="w-full text-sm border-collapse font-sans">
        <tbody>
          <tr className="border-b-2 border-white">
            <td className="w-1/3 p-3 font-bold text-gray-700 align-middle bg-[#A4C5E8]">Name</td>
            <td className="w-2/3 p-3 text-black capitalize align-middle bg-[#DAE9F7]">{pokemon.name}</td>
          </tr>
          <tr className="border-b-2 border-white">
            <td className="w-1/3 p-3 font-bold text-gray-700 align-middle bg-[#F6E69D]">Weight</td>
            <td className="w-2/3 p-3 text-black align-middle bg-[#FAF4D6]">{pokemon.weight}kg</td>
          </tr>
          <tr className="border-b-2 border-white">
            <td className="w-1/3 p-3 font-bold text-gray-700 align-middle bg-[#A4C5E8]">Height</td>
            <td className="w-2/3 p-3 text-black align-middle bg-[#DAE9F7]">{pokemon.height}m</td>
          </tr>
          <tr className="border-b-2 border-white">
            <td className="w-1/3 p-3 font-bold text-gray-700 align-middle bg-[#F6E69D]">Abilities</td>
            <td className="w-2/3 p-3 text-black capitalize align-middle bg-[#FAF4D6]">
              {pokemon.abilities
                .filter(({ is_hidden }) => !is_hidden)
                .map(({ ability }) => ability.name)
                .join(", ")}
            </td>
          </tr>
          
          <tr>
            <td className="w-1/3 p-3 font-bold text-gray-700 align-middle bg-[#A4C5E8]">Status</td>
            <td className="w-2/3 p-3 text-black align-middle bg-[#DAE9F7]">
              {isCaught ? "Caught" : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
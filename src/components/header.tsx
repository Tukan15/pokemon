import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-poke-red h-20 w-full flex items-center justify-between px-12 shadow-md shrink-0">
      <div className="relative w-32 h-10">
        <Image 
          src="/pokemon-logo.png" 
          alt="Pokemon Logo" 
          fill 
          className="object-contain"
          priority
        />
      </div>
      <a 
        href="https://pokeapi.co/" 
        target="_blank" 
        className="text-white text-sm font-medium hover:underline opacity-90"
      >
        PokeAPI Documentation
      </a>
    </header>
  );
};
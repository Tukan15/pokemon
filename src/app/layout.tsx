import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { PokemonProvider } from "@/context/PokemonContext";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Mindtech Apps Pokemon App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <PokemonProvider>
          {children}
        </PokemonProvider>
      </body>
    </html>
  );
}
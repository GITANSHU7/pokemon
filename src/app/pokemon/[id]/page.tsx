"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge, Card, Spinner } from "flowbite-react";
import Pokeball from "@/components/Pokeball";

interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    other: {
      dream_world: { front_default: string };
    };
  };
  species: { name: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string } }[];
}
const PokemonDetailPage = () => {
  const { id } = useParams() as { id: string };
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Pokémon details", error);
        setLoading(false);
      }
    };

    if (id) fetchPokemonDetails();
  }, [id]);

  if (loading) return (<>
  <div className="flex items-center justify-center h-screen ">
      <div className="flex gap-6">
        <Pokeball />
        <Pokeball />
        <Pokeball />
        <Pokeball />
        <Pokeball />
      </div>
    </div>
  </>);

  if (!pokemon)
    return <p className="text-center text-red-500">Pokémon not found!</p>;

  return (
    <>
      <div className="bg-[#1E201E]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-4">
           
            <div className="w-full md:w-1/2 px-4 mb-8">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt="Product"
                className="w-full h-[70vh]   rounded-lg shadow-md mb-4"
                id="mainImage"
              />
             
            </div>

          
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2 capitalize">
                {pokemon?.name}
              </h2>
              <div className="flex justify-start gap-2 my-2">
                {pokemon.types.map((type, index) => (
                  <Badge key={index} color="info" className="capitalize">
                    {type.type.name}
                  </Badge>
                ))}
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  Base Experience:{pokemon?.base_experience}
                </span>
              </div>

              <h3 className="text-lg font-semibold mt-4">Moves:</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.slice(0, 10).map((move, index) => (
                  <Badge key={index} color="info" className="capitalize">
                    {move.move.name}
                  </Badge>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Stats:</h3>
                <ul className="list-disc list-inside text-white">
                  {pokemon.stats.map((stat, index) => (
                    <li key={index} className="capitalize">
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailPage;

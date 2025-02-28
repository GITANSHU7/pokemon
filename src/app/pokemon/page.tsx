"use client";
import { useState, useEffect } from "react";
import { Badge, Card, TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import Pokeball from "@/components/Pokeball";

export default function PokemonCard() {
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 20; 

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon: any) => {
        const res = await fetch(curPokemon.url);
        return res.json();
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const filteredPokemons = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPokemons.length / pokemonsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Pokemon Explorer</h1>

    
      <TextInput
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full sm:w-96 mx-auto"
      />

      {loading ? (
       
        <>
        <div className="flex items-center justify-center h-screen ">
      <div className="flex gap-6">
        <Pokeball />
        <Pokeball />
        <Pokeball />
        <Pokeball />
        <Pokeball />
      </div>
    </div>
        </>
      ) : (
        <>
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemons.map((curPokemon) => (
              <Card
                key={curPokemon.id}
               
                onClick={() => router.push(`/pokemon/${curPokemon.id}`)}
                className="relative overflow-hidden cursor-pointer"
              >
              
                <Badge
                  color="success"
                  className="absolute top-2 right-2 capitalize"
                >
                  {curPokemon.types
                    .map((curType: any) => curType.type.name)
                    .join(", ")}
                </Badge>

                <div className="h-48 overflow-hidden flex justify-center items-center">
                  <img
                    src={
                      curPokemon?.sprites.other.dream_world.front_default ||
                      curPokemon?.sprites.front_default
                    }
                    alt={curPokemon.name}
                    className="h-full w-full object-contain bg-slate-400"
                  />
                </div>

                <h2 className="text-center font-bold capitalize text-black">
                  {curPokemon.name}
                </h2>
              </Card>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="text-lg font-semibold">
              Page {currentPage} of{" "}
              {Math.ceil(filteredPokemons.length / pokemonsPerPage)}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={
                currentPage >=
                Math.ceil(filteredPokemons.length / pokemonsPerPage)
              }
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}


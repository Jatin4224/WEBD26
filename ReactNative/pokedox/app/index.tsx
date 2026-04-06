import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

interface Pokemon {
  name: string;
  image: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}
export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );
      const data = await response.json();
      //fetch detailed info for each pokemon in parallel

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default, //main sprite
            types: details.types,
          };
        }),
      );
      setPokemons(detailedPokemons);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pokemons.map((pokemon) => (
        <Link key={pokemon.name} href={"/details"} asChild>
          <Pressable style={styles.card}>
            <Image source={{ uri: pokemon.image }} style={styles.image} />

            <Text style={styles.name}>{pokemon.name}</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",

    // subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#0f172a",
  },
});

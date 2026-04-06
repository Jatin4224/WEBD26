### why Expo ?

- native modules
- navigation
- expo go
- EAS
- submissions
- Routing

### what is Expo GO?

- its a free application that you can download from store. u can test your application easily.

## Building first app (pokedox)

- npx create-expo-app@latest
- npx expo start (starts the server)
- open expo go in your device and scan the qr code show in the terminal

- npm run reset-project (will delete extra folders and make app simple) select n
- npm run start - to start the server

### pokemon api

https://pokeapi.co/

- step 1

```
<!-- index.tsx -->
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20",
      );
      const data = response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>pokedox</Text>
    </View>
  );
}

```

- step 2 (fetching details of each pokemon)

```
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
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
          };
        }),
      );
      setPokemons(detailedPokemons);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
          <Image
            source={{ uri: pokemon.image }}
            style={{ width: 100, height: 100 }}
          ></Image>
        </View>
      ))}
    </ScrollView>
  );
}

```

step 3 - updating ui using sylesheet, adding routes , Link,pressable

step 4 - updating layout

```
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.5, 0.7],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
```

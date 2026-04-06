## Why Expo?

- Provides access to **native modules** easily
- Built-in **navigation support**
- Use **Expo Go** to test apps instantly
- Supports **EAS (Expo Application Services)** for building apps
- Easy **app submission** process
- File-based **routing with Expo Router**

---

## 📲 What is Expo Go?

- Expo Go is a **free mobile application** available on app stores
- It allows you to **run and test your React Native apps instantly** on your device
- Just scan the QR code from your terminal and see your app live

---

## 🛠️ Building First App (Pokédex)

### Setup

```bash
npx create-expo-app@latest
npx expo start   # starts the development server
```

- Open **Expo Go** on your phone
- Scan the QR code shown in the terminal

---

### Project Cleanup

```bash
npm run reset-project   # removes extra boilerplate (select "n")
npm run start           # start the server
```

---

## 🌐 Pokémon API

[https://pokeapi.co/](https://pokeapi.co/)

---

## 📌 Step 1 – Fetch Pokémon List

```tsx
// index.tsx
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
      const data = await response.json(); // fixed: added await
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
      <Text>Pokedex</Text>
    </View>
  );
}
```

---

## 📌 Step 2 – Fetch Pokémon Details

```tsx
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

      // Fetch detailed info for each Pokémon in parallel
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();

          return {
            name: pokemon.name,
            image: details.sprites.front_default,
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
          />
        </View>
      ))}
    </ScrollView>
  );
}
```

---

## 📌 Step 3 – UI Improvements

- Styled components using **StyleSheet**
- Added **Pressable** for better interaction
- Used **Link (Expo Router)** for navigation between screens

---

## 📌 Step 4 – Layout & Navigation Setup

```tsx
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

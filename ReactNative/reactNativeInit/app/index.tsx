import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Switch,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const USERS = [
  { id: "1", name: "Alice", role: "Designer" },
  { id: "2", name: "Jatin", role: "Frontend Developer" },
  { id: "3", name: "Sophia", role: "UI/UX Designer" },
  { id: "4", name: "Ethan", role: "Backend Developer" },
  { id: "5", name: "Mia", role: "AI Engineer" },
];

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC",
          },
        ]}
      >
        <Text>welcome to my app</Text>

        {/* remote image from internet */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1777335118390-969261251a29?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          blurRadius={10}
          width={200}
          height={200}
        />

        {/* Local Image */}
        <Image
          source={require("@/assets/images/icon.png")}
          style={{
            height: 100,
            width: 200,
          }}
        />

        <TextInput
          placeholder="enter your name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
          style={{
            width: 200,
            color: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
          }}
        />

        <Pressable
          onPress={() => alert("Button Pressed")}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#4a42d4" : "grey",
          })}
        >
          {({ pressed }) =>
            pressed ? <Text>Pressing...</Text> : <Text>Press Me</Text>
          }
          {/* <Text>Press Me</Text> */}
        </Pressable>

        <View>
          <Text
            style={{
              color: isDarkMode ? "#fff" : "#111827",
              fontWeight: "600",
            }}
          >
            Dark Mode 🌙
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#CBD5E1", true: "#8B5CF6" }}
            thumbColor="#fff"
          />
        </View>

        <FlatList
          data={USERS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "black" }} />
          )}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "height" : ""}
        ></KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

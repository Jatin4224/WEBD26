// import { useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   TextInput,
//   Pressable,
//   Switch,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// import { SafeAreaView } from "react-native-safe-area-context";

// const USERS = [
//   { id: "1", name: "Alice", role: "Designer" },
//   { id: "2", name: "Jatin", role: "Frontend Developer" },
//   { id: "3", name: "Sophia", role: "UI/UX Designer" },
//   { id: "4", name: "Ethan", role: "Backend Developer" },
//   { id: "5", name: "Mia", role: "AI Engineer" },
// ];

// export default function HomeScreen() {
//   const [name, setName] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={[
//           styles.container,
//           {
//             backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC",
//           },
//         ]}
//       >
//         <Text>welcome to my app</Text>

//         {/* remote image from internet */}
//         <Image
//           source={{
//             uri: "https://images.unsplash.com/photo-1777335118390-969261251a29?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//           }}
//           blurRadius={10}
//           width={200}
//           height={200}
//         />

//         {/* Local Image */}
//         <Image
//           source={require("@/assets/images/icon.png")}
//           style={{
//             height: 100,
//             width: 200,
//           }}
//         />

//         <TextInput
//           placeholder="enter your name"
//           placeholderTextColor="gray"
//           value={name}
//           onChangeText={setName}
//           style={{
//             width: 200,
//             color: "black",
//             borderWidth: 1,
//             padding: 10,
//             borderRadius: 10,
//           }}
//         />

//         <Pressable
//           onPress={() => alert("Button Pressed")}
//           style={({ pressed }) => ({
//             backgroundColor: pressed ? "#4a42d4" : "grey",
//           })}
//         >
//           {({ pressed }) =>
//             pressed ? <Text>Pressing...</Text> : <Text>Press Me</Text>
//           }
//           {/* <Text>Press Me</Text> */}
//         </Pressable>

//         <View>
//           <Text
//             style={{
//               color: isDarkMode ? "#fff" : "#111827",
//               fontWeight: "600",
//             }}
//           >
//             Dark Mode 🌙
//           </Text>
//           <Switch
//             value={isDarkMode}
//             onValueChange={setIsDarkMode}
//             trackColor={{ false: "#CBD5E1", true: "#8B5CF6" }}
//             thumbColor="#fff"
//           />
//         </View>

//         <FlatList
//           data={USERS}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ padding: 16 }}
//           renderItem={({ item }) => <Text>{item.name}</Text>}
//           ItemSeparatorComponent={() => (
//             <View style={{ height: 1, backgroundColor: "black" }} />
//           )}
//         />

//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "height" : ""}
//         ></KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 5,
//   },
// });

// import { StatusBar, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import {
//   SafeAreaView,
//   useSafeAreaInsets,
// } from "react-native-safe-area-context";

// const HomeScreen = () => {
//   const isActive = true;

//   const buttonStyle = StyleSheet.compose(
//     styles.button,
//     isActive ? styles.activeButton : null,
//   );

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View style={buttonStyle}>
//           <Text style={styles.buttonText}>compose style</Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 10,
//     backgroundColor: "#ccc", // Default grey
//   },
//   activeButton: {
//     backgroundColor: "#6C63FF", // Override to purple when active
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const styleA = StyleSheet.create({ text: { color: "red", fontSize: 16 } });
// const styleB = StyleSheet.create({
//   text: { fontSize: 24, fontWeight: "bold" },
// });

// const flat = StyleSheet.flatten([styleA.text, styleB.text]);
// const HomeScreen = () => {
//   return <Text style={styleB.text}>FLATTEND STYLES</Text>;
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const themes = {
  light: {
    background: "#FFFFFF",
    card: "#F5F5F5",
    text: "#1A1A1A",
    subtext: "#666666",
    accent: "#6C63FF",
  },

  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    subtext: "#AAAAAA",
    accent: "#9D97FF",
  },
};

const HomeScreen = () => {
  const systemScheme = useColorScheme(); // light / dark

  const [manualDark, setManualDark] = useState<boolean | null>(null);

  console.log(systemScheme);

  const isDark = manualDark !== null ? manualDark : systemScheme === "dark";

  const theme = isDark ? themes.dark : themes.light;

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        {/* Header */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Dynamic Theme UI
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.subtext,
              },
            ]}
          >
            React Native light & dark mode
          </Text>
        </View>

        {/* Theme Switch */}
        <View
          style={[
            styles.card,
            styles.row,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.label,
                {
                  color: theme.text,
                },
              ]}
            >
              Dark Mode
            </Text>

            <Text
              style={[
                styles.subtitle,
                {
                  color: theme.subtext,
                },
              ]}
            >
              Toggle app appearance
            </Text>
          </View>

          <Switch
            value={isDark}
            onValueChange={(value) => setManualDark(value)}
            trackColor={{
              false: "#D1D5DB",
              true: theme.accent,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* Info Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color: theme.text,
              },
            ]}
          >
            Current Theme
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.subtext,
              },
            ]}
          >
            {isDark ? "Dark Theme Active 🌙" : "Light Theme Active ☀️"}
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 18,
  },

  card: {
    padding: 20,
    borderRadius: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -1,
  },

  subtitle: {
    fontSize: 14,
    marginTop: 6,
    lineHeight: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
  },
});

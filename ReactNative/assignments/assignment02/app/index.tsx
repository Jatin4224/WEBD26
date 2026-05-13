import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useState, useEffect } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { FallingLeaf } from "./FallingLeaf";

const BACKGROUND_COLOR = "#F7F0E8";
const CARD_COLOR = "#FFFAF5";
const TEXT_COLOR = "#50453A";
const RED_COLOR = "#C95A4A";

const notes = [
  {
    id: "1",
    title: "Shaam Ki Chai",
    desc: "Aaj terrace pe baithke chai peeni hai aur thoda relax karna hai.",
    date: "12 May 2026",
  },
  {
    id: "2",
    title: "Trip Plan",
    desc: "Jaipur trip ke liye outfits aur camera pack karna mat bhoolna.",
    date: "11 May 2026",
  },
  {
    id: "3",
    title: "Random Thought",
    desc: "Kabhi kabhi slow life bhi kaafi peaceful lagti hai.",
    date: "10 May 2026",
  },
  {
    id: "4",
    title: "Late Night Vibes",
    desc: "Rainy weather + music + dim lights = perfect mood honestly.",
    date: "09 May 2026",
  },
];

export default function Index() {
  const [search, setSearch] = useState("");

  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"default"} />

      <View style={styles.topImageContainer}>
        <Image
          source={require("@/assets/images/notesIcon.png")}
          style={styles.notesIcon}
        />

        <Image
          source={require("@/assets/images/backgroundTop.png")}
          style={styles.topBackgroundImage}
        />
      </View>

      <View style={styles.mainContainer}>
        {/* {/* searchbar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={22} color={TEXT_COLOR} />
          <TextInput
            placeholder="Search notes.."
            placeholderTextColor={TEXT_COLOR}
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          <Ionicons name="list" size={24} color={TEXT_COLOR} />
        </View>

        {/* mini header*/}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>All Notes</Text>
          <Text style={styles.headerSub}>24 Notes</Text>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <Text numberOfLines={2} style={styles.cardDesc}>
                {item.desc}
              </Text>

              <Text style={styles.cardDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      {/* bottm image*/}
      <View style={styles.bottomContainer}>
        <Image
          source={require("@/assets/images/bottomImage.png")}
          style={styles.bottomImage}
        />
        <BlurView intensity={1} tint="light" style={styles.blur} />
      </View>

      {/* leafdrop animation */}
      <FallingLeaf
        source={require("@/assets/leaf.png")}
        startX={width - 50}
        delay={0}
      />

      <FallingLeaf
        source={require("@/assets/leaf.png")}
        startX={width - 80}
        delay={500}
      />

      <FallingLeaf
        source={require("@/assets/leaf.png")}
        startX={width - 120}
        delay={1000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },

  topImageContainer: {
    position: "absolute",
    top: -12,
    left: 0,
    right: 0,
    height: 260,
    zIndex: -10,
  },

  notesIcon: {
    height: 80,
    width: 80,
    position: "absolute",
    top: 80,
    left: 26,
    zIndex: -10,
  },

  topBackgroundImage: {
    height: 220,
    width: 320,
    paddingRight: 2,
    position: "absolute",
    top: 80,
    right: 0,
    zIndex: -10,
  },

  mainContainer: {
    backgroundColor: BACKGROUND_COLOR,
    height: 560,
    marginBottom: -10,
  },

  searchBar: {
    width: 320,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginLeft: 10,
    // backgroundColor: BACKGROUND_COLOR,
  },

  input: {
    marginLeft: 10,
    fontSize: 16,
    width: 220,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    zIndex: 10,
  },

  headerTitle: {
    color: TEXT_COLOR,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  headerSub: {
    color: TEXT_COLOR,
    fontSize: 13,
    fontWeight: "400",
    opacity: 0.7,
  },

  listContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: CARD_COLOR,
    padding: 18,
    borderRadius: 22,
    marginHorizontal: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E8DED1",
    maxWidth: 320,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2C241E",
    marginBottom: 8,
  },

  cardDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: "#6B5E52",
    marginBottom: 14,
  },

  cardDate: {
    fontSize: 12,
    color: "#9B8D7F",
    fontWeight: "500",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
  },

  bottomImage: {
    height: 180,
    width: 400,
    zIndex: -10,
  },

  blur: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
});

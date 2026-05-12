import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
const BACKGROUND_COLOR = "#F4EADF";
const CARD_COLOR = "#F8F1EA";
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <StatusBar barStyle={"default"} />
      <View
        style={{
          position: "absolute",
          top: -12,
          left: 0,
          right: 0,
          height: 260,
          zIndex: -10,
        }}
      >
        <Image
          source={require("@/assets/images/notesIcon.png")}
          style={{
            height: 80,
            width: 80,
            position: "absolute",
            top: 80,
            left: 26,
            zIndex: -10,
          }}
        />

        <Image
          source={require("@/assets/images/backgroundTop.png")}
          style={{
            height: 220,

            width: 320,
            paddingRight: 2,
            position: "absolute",
            top: 80,
            right: 0,
            zIndex: -10,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: BACKGROUND_COLOR,
          height: 560,
          marginBottom: -10,
        }}
      >
        {/* SEARCHBAR */}
        <View
          style={{
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
            backgroundColor: BACKGROUND_COLOR,
          }}
        >
          {" "}
          <Feather name="search" size={22} color="#50453A" />
          <TextInput
            placeholder="Search notes.."
            placeholderTextColor={TEXT_COLOR}
            value={search}
            onChangeText={setSearch}
            style={{
              marginLeft: 10,
              fontSize: 16,
              width: 220,
            }}
          />
          <Ionicons name="list" size={24} color="#50453A" />
        </View>
        {/* {/miniHEADIN} */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 20,
            zIndex: 10,
          }}
        >
          <Text
            style={{
              color: TEXT_COLOR,
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 0.3,
            }}
          >
            All Notes
          </Text>

          <Text
            style={{
              color: TEXT_COLOR,
              fontSize: 13,
              fontWeight: "400",
              opacity: 0.7,
            }}
          >
            24 Notes
          </Text>
        </View>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: 40,
          }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: CARD_COLOR,
                padding: 18,
                borderRadius: 22,
                marginHorizontal: 10,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: "#E8DED1",
                maxWidth: 320,
              }}
            >
              {/* TITLE */}
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "700",
                  color: "#2C241E",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </Text>

              {/* CONTENT PREVIEW */}
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  lineHeight: 22,
                  color: "#6B5E52",
                  marginBottom: 14,
                }}
              >
                {item.desc}
              </Text>

              {/* DATE */}
              <Text
                style={{
                  fontSize: 12,
                  color: "#9B8D7F",
                  fontWeight: "500",
                }}
              >
                {item.date}
              </Text>
            </View>
          )}
        />
      </View>

      {/* BOTTOM IMAGE */}
      <View style={{ position: "absolute", bottom: 0 }}>
        <Image
          source={require("@/assets/images/bottomImage.png")}
          style={{
            height: 180,
            width: 400,
            zIndex: -10,
          }}
        />
        <BlurView
          intensity={1}
          tint="light"
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

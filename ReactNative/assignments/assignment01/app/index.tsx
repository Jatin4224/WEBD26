import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Inter_700Bold } from "@expo-google-fonts/inter";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HomeScreen = () => {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        gap: 20,
        paddingTop: insets.top,
      }}
    >
      <StatusBar barStyle={"default"} />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          top: -40,
        }}
      >
        <Image
          source={require("@/assets/images/icon.png.png")}
          style={{
            width: 80,
            height: 80,
            borderRadius: 60,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          top: -40,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: "Inter_700Bold",
            color: "#2F3632",
            fontWeight: "700",
          }}
        >
          Sign In
        </Text>
        <Text
          style={{
            color: "#8C908D",
            fontSize: 16,
            fontWeight: "400",
            top: -10,
          }}
        >
          Let's experience the joy of telecare AI.
        </Text>
      </View>

      <View
        style={{
          gap: 8,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingLeft: 10,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_700Bold",
            color: "#2F3632",
            fontWeight: "700",
          }}
        >
          Email Address
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            width: 370,
            backgroundColor: "#fff",
            borderRadius: 18,
            paddingHorizontal: 18,

            borderColor: isFocusedEmail ? "#B7E66A" : "transparent",

            shadowColor: isFocusedEmail ? "#8AD80F" : "#000",

            shadowOffset: {
              width: 0,
              height: 4,
            },

            shadowOpacity: isFocusedEmail ? 1 : 0.08,

            shadowRadius: isFocusedEmail ? 6 : 8,

            elevation: isFocusedEmail ? 10 : 3,
            gap: 10,
          }}
        >
          <Feather name="mail" size={20} color="#444" />
          <TextInput
            placeholder="enter your email"
            placeholderTextColor="#8C908D"
            style={{
              flex: 1,
              fontSize: 16,
              paddingVertical: 16,
            }}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
          />
        </View>

        <Text
          style={{
            fontSize: 12,
            fontFamily: "Inter_700Bold",
            color: "#2F3632",
            fontWeight: "700",
          }}
        >
          Password
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            width: 370,
            backgroundColor: "#fff",
            borderRadius: 18,
            paddingHorizontal: 18,

            borderColor: isFocusedPassword ? "#B7E66A" : "transparent",

            shadowColor: isFocusedPassword ? "#8AD80F" : "#000",

            shadowOffset: {
              width: 0,
              height: 4,
            },

            shadowOpacity: isFocusedPassword ? 1 : 0.08,

            shadowRadius: isFocusedPassword ? 6 : 8,

            elevation: isFocusedPassword ? 10 : 3,
            gap: 10,
          }}
        >
          <Feather name="lock" size={20} color="#666" />
          <TextInput
            placeholder="Enter your password..."
            placeholderTextColor="#8C908D"
            secureTextEntry
            style={{
              flex: 1,
              paddingVertical: 16,
              fontSize: 16,
            }}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
          />
          <Ionicons
            name="eye-off-outline"
            size={22}
            color="#999"
            style={{ marginRight: 8 }}
          />
        </View>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Pressable
          style={({ pressed }) => ({
            width: 360,
            backgroundColor: pressed ? "#7BC700" : "#8AD80F",

            paddingVertical: 18,

            borderRadius: 20,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            gap: 10,

            shadowColor: "#8AD80F",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,

            elevation: 5,
          })}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Sign In
          </Text>
          <Feather name="arrow-right" size={20} color="#fff" />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignContent: "center",
          justifyContent: "center",
          paddingVertical: 16,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            backgroundColor: "#fff",

            alignItems: "center",
            justifyContent: "center",

            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
        >
          <FontAwesome name="facebook" size={24} color="black" />
        </View>

        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            backgroundColor: "#fff",

            alignItems: "center",
            justifyContent: "center",

            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
        >
          <AntDesign name="instagram" size={28} color="#333" />
        </View>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 20,
            backgroundColor: "#fff",

            alignItems: "center",
            justifyContent: "center",

            borderWidth: 1,
            borderColor: "#E5E5E5",
          }}
        >
          <AntDesign name="google" size={28} color="#333" />
        </View>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Text style={{ fontSize: 12, color: "#00000", fontWeight: 500 }}>
          Don't have an account?{" "}
          <Text
            style={{
              color: "#7BC700",
              textDecorationLine: "underline",
              fontWeight: "600",
            }}
          >
            Sign Up.
          </Text>
        </Text>

        <Text
          style={{
            fontSize: 12,
            color: "#7BC700",
            fontWeight: "600",
            textDecorationLine: "underline",
          }}
        >
          Forgot your password?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

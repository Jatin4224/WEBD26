import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const ORANGE = "#EB5A22";
const ITEMS = Array(20).fill("LETSDOIT");

function MarqueeText({ reverse = false, top = 0 }) {
  const x = useSharedValue(reverse ? -width : 0);

  useEffect(() => {
    x.value = withRepeat(
      withTiming(reverse ? 0 : -width, {
        duration: 16000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.marqueeRow,
        {
          top,
          left: reverse ? -width : 0,
        },
        animatedStyle,
      ]}
    >
      {ITEMS.map((item, index) => (
        <Text key={index} style={styles.marqueeText}>
          {item}
        </Text>
      ))}
    </Animated.View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Image
        source={require("../assets/bg-texture.png")}
        style={styles.bgTexture}
      />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <View style={styles.paperContent}>
          <View style={styles.marqueeWrapper}>
            <MarqueeText top={0} />
            <MarqueeText top={40} reverse />
            <MarqueeText top={80} />
          </View>

          <Image
            source={require("../assets/character.png")}
            style={styles.character}
            resizeMode="contain"
          />
        </View>

        <Image
          source={require("../assets/torn-paper.png")}
          style={styles.paperTear}
          resizeMode="contain"
        />
      </View>

      <View style={styles.copyBox}>
        <Text style={styles.title}>Transform</Text>
        <Text style={styles.titleOrange}>your physique.</Text>

        <Text style={styles.subtitle}>
          Your AI nutrition coach for{"\n"}
          smarter bulking and <Text style={styles.orange}>real results.</Text>
        </Text>

        <View style={styles.dots}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.85} style={styles.cta}>
        <Text style={styles.ctaText}>Get Started</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <Text style={styles.signin}>
        Already have an account?{" "}
        <Text style={styles.signinOrange}>Sign In</Text>
      </Text>

      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F6F2",
    alignItems: "center",
  },

  bgTexture: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.42,
  },

  topBar: {
    width: "100%",
    paddingHorizontal: 32,
    paddingTop: height < 750 ? 6 : 12,
    alignItems: "flex-end",
    zIndex: 20,
  },

  skipBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.18)",
    borderRadius: 999,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.24)",
  },

  skipText: {
    fontSize: 14,
    color: "#111",
    fontWeight: "600",
  },

  hero: {
    width,
    height: height * 0.38,
    marginTop: height < 750 ? 4 : 18,
    alignItems: "center",
    justifyContent: "center",
  },

  paperTear: {
    position: "absolute",
    width: 600,
    height: 600,
    zIndex: 10,
    marginBottom: 50,
  },

  paperContent: {
    width: width * 0.78,
    height: height * 0.29,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 5,
  },

  marqueeWrapper: {
    position: "absolute",
    top: 72,
    width: width * 0.78,
    height: 170,
    overflow: "hidden",
    zIndex: 1,
  },

  marqueeRow: {
    position: "absolute",
    flexDirection: "row",
    width: width * 4,
  },

  marqueeText: {
    fontSize: 38,
    lineHeight: 40,
    fontWeight: "900",
    color: ORANGE,
    marginRight: 18,
    letterSpacing: -1.5,
  },

  character: {
    position: "absolute",
    bottom: -30,
    width: 300,
    height: 360,
    zIndex: 3,
  },

  copyBox: {
    marginTop: height < 750 ? 6 : 18,
    alignItems: "center",
    zIndex: 12,
  },

  title: {
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "900",
    color: "#060606",
    letterSpacing: -2.4,
  },

  titleOrange: {
    fontSize: 50,
    lineHeight: 56,
    fontWeight: "900",
    color: ORANGE,
    letterSpacing: -2.4,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16.5,
    lineHeight: 23,
    color: "#777",
    textAlign: "center",
    fontWeight: "500",
  },

  orange: {
    color: ORANGE,
    fontWeight: "600",
  },

  dots: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12,
  },

  dot: {
    width: 11,
    height: 11,
    borderRadius: 99,
    backgroundColor: "#D9D9D9",
  },

  activeDot: {
    backgroundColor: ORANGE,
  },

  cta: {
    marginTop: height < 750 ? 24 : 34,
    width: "82%",
    height: 72,
    borderRadius: 999,
    backgroundColor: "#101010",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },

  ctaText: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -0.7,
    marginRight: 14,
  },

  arrow: {
    color: ORANGE,
    fontSize: 34,
    fontWeight: "400",
    marginTop: -2,
  },

  signin: {
    marginTop: 24,
    fontSize: 16,
    color: "#777",
    fontWeight: "500",
  },

  signinOrange: {
    color: ORANGE,
    fontWeight: "700",
  },

  homeIndicator: {
    position: "absolute",
    bottom: 10,
    width: 134,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#000",
  },
});

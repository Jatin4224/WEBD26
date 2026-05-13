import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Dimensions, Image } from "react-native";

const { height, width } = Dimensions.get("window");

export function FallingLeaf({ source, delay = 0, startX = 0 }) {
  const translateY = useSharedValue(-10);
  const translateX = useSharedValue(startX);
  const rotate = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      translateY.value = withRepeat(
        withTiming(height + 100, {
          duration: 6000 + Math.random() * 3000,
          easing: Easing.linear,
        }),
        -1,
        false,
      );

      translateX.value = withRepeat(
        withTiming(startX + (Math.random() * 100 - 50), {
          duration: 6000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true,
      );

      rotate.value = withRepeat(
        withTiming(360, {
          duration: 4000,
          easing: Easing.linear,
        }),
        -1,
      );
    }, delay);
  }, []);

  const style = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: 0.9,
    };
  });

  return (
    <Animated.View style={style}>
      <Image
        source={source}
        style={{ width: 20, height: 20, resizeMode: "contain" }}
      />
    </Animated.View>
  );
}

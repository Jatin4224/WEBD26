# React Native Core Components & Styling Notes

## SafeAreaView

`SafeAreaView` prevents content from overlapping with device notches, status bars, and home indicators.

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

<SafeAreaView style={{ flex: 1 }}>
  <Text>Hello World</Text>
</SafeAreaView>;
```

### Why Use It?

- Prevents UI from getting hidden behind the notch
- Creates proper spacing on iOS devices
- Makes layouts cleaner and safer

---

# Image Component

Used to display images in React Native.

---

## Remote Image

Loads an image from the internet using a URL.

```tsx
<Image
  source={{
    uri: "https://images.unsplash.com/photo.jpg",
  }}
  width={200}
  height={200}
  blurRadius={10}
/>
```

### Important Props

| Prop         | Purpose                      |
| ------------ | ---------------------------- |
| `source`     | Defines image source         |
| `uri`        | URL for remote image         |
| `blurRadius` | Adds blur effect             |
| `width`      | Image width                  |
| `height`     | Image height                 |
| `resizeMode` | Controls image fitting style |

---

## Local Image

Used for images stored inside the project.

```tsx
<Image
  source={require("@/assets/images/icon.png")}
  style={{
    width: 200,
    height: 100,
  }}
/>
```

### Why Use Local Images?

- Faster loading
- Works offline
- Better app performance

---

# TextInput

Used to take user input.

```tsx
<TextInput placeholder="Enter your name" value={name} onChangeText={setName} />
```

### Important Props

| Prop                   | Purpose                   |
| ---------------------- | ------------------------- |
| `placeholder`          | Hint text inside input    |
| `placeholderTextColor` | Changes placeholder color |
| `value`                | Current input value       |
| `onChangeText`         | Updates state on typing   |
| `secureTextEntry`      | Hides password text       |

### Controlled Input

```tsx
const [name, setName] = useState("");

<TextInput value={name} onChangeText={setName} />;
```

The input value is controlled using React state.

---

# Pressable

Used to create touchable buttons with press interactions.

```tsx
<Pressable
  onPress={() => alert("Pressed")}
  style={({ pressed }) => ({
    backgroundColor: pressed ? "#4a42d4" : "grey",
  })}
>
  {({ pressed }) =>
    pressed ? <Text>Pressing...</Text> : <Text>Press Me</Text>
  }
</Pressable>
```

### Features

- Detects pressed state
- Better than older touchable components
- Supports dynamic styling

### Important Props

| Prop       | Purpose                  |
| ---------- | ------------------------ |
| `onPress`  | Runs on button press     |
| `style`    | Dynamic button styling   |
| `children` | Can access pressed state |

---

# Switch Component

Used to toggle between `true` and `false`.

```tsx
<Switch value={isDarkMode} onValueChange={setIsDarkMode} />
```

### Important Props

| Prop            | Purpose                |
| --------------- | ---------------------- |
| `value`         | Current switch state   |
| `onValueChange` | Updates switch value   |
| `trackColor`    | Track background color |
| `thumbColor`    | Thumb circle color     |

---

# FlatList

Efficiently renders long lists in React Native.

```tsx
<FlatList
  data={USERS}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.name}</Text>}
/>
```

### Important Props

| Prop                     | Purpose                        |
| ------------------------ | ------------------------------ |
| `data`                   | Array of items                 |
| `renderItem`             | Renders each item              |
| `keyExtractor`           | Unique key for every item      |
| `ItemSeparatorComponent` | Adds separators between items  |
| `contentContainerStyle`  | Styles inner content container |

### Why Use FlatList?

- Optimized performance
- Lazy loads items
- Better memory management

---

# KeyboardAvoidingView

Prevents keyboard from covering inputs.

```tsx
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "height" : undefined}
/>
```

### Why Use It?

- Keeps input visible while typing
- Improves mobile form UX

### Common Behaviors

| Behavior   | Purpose                          |
| ---------- | -------------------------------- |
| `height`   | Adjusts container height         |
| `padding`  | Adds padding when keyboard opens |
| `position` | Moves entire view                |

---

# useColorScheme Hook

Detects the system theme.

```tsx
const systemScheme = useColorScheme();
```

### Possible Values

| Value   | Meaning           |
| ------- | ----------------- |
| `light` | Light mode        |
| `dark`  | Dark mode         |
| `null`  | Theme unavailable |

---

# Dynamic Theming

Creating custom light and dark themes.

```tsx
const themes = {
  light: {
    background: "#FFFFFF",
    text: "#111111",
  },

  dark: {
    background: "#121212",
    text: "#FFFFFF",
  },
};
```

---

## Theme Selection Logic

```tsx
const isDark = manualDark !== null ? manualDark : systemScheme === "dark";

const theme = isDark ? themes.dark : themes.light;
```

### Explanation

1. First checks manual theme selection
2. If manual mode is not set:
   - Uses device theme automatically

3. Chooses correct theme object

---

# StatusBar

Controls the appearance of the mobile status bar.

```tsx
<StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
```

### Common Values

| Value           | Purpose          |
| --------------- | ---------------- |
| `light-content` | White icons/text |
| `dark-content`  | Dark icons/text  |

---

# StyleSheet.create()

Used to create optimized styles.

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Benefits

- Better performance
- Cleaner code
- Centralized styling
- Style validation

---

# StyleSheet.compose()

Combines multiple styles together.

```tsx
const buttonStyle = StyleSheet.compose(styles.button, styles.activeButton);
```

### Why Use It?

- Merges styles
- Helpful for conditional UI styling

---

# StyleSheet.flatten()

Converts multiple style objects into one object.

```tsx
const flat = StyleSheet.flatten([styleA.text, styleB.text]);
```

### Use Case

Useful when debugging merged styles.

---

# Dynamic Styling

Applying styles conditionally.

```tsx
<View
  style={[
    styles.card,
    {
      backgroundColor: theme.card,
    },
  ]}
/>
```

### Why Use Arrays?

React Native merges styles from left to right.

---

# Core Layout Properties

---

## flex

```tsx
flex: 1;
```

Makes component take available space.

---

## flexDirection

```tsx
flexDirection: "row";
```

Arranges children horizontally.

---

## justifyContent

Controls alignment on the main axis.

```tsx
justifyContent: "space-between";
```

---

## alignItems

Controls alignment on the cross axis.

```tsx
alignItems: "center";
```

---

## gap

Adds spacing between children.

```tsx
gap: 18;
```

---

# Common Styling Properties

| Property          | Purpose               |
| ----------------- | --------------------- |
| `padding`         | Inner spacing         |
| `margin`          | Outer spacing         |
| `borderRadius`    | Rounded corners       |
| `backgroundColor` | Background color      |
| `fontSize`        | Text size             |
| `fontWeight`      | Text thickness        |
| `letterSpacing`   | Space between letters |
| `lineHeight`      | Vertical text spacing |

---

# State Management with useState

```tsx
const [isDarkMode, setIsDarkMode] = useState(false);
```

### Syntax

```tsx
const [state, setState] = useState(initialValue);
```

### Purpose

- Stores dynamic data
- Re-renders UI when updated

---

# React Native Styling Difference

Unlike web CSS:

```tsx
font-size ❌
fontSize ✅
```

React Native uses camelCase styling.

---

# Platform API

Used to detect the operating system.

```tsx
Platform.OS === "ios";
```

### Possible Values

| Value     | Platform |
| --------- | -------- |
| `ios`     | iPhone   |
| `android` | Android  |
| `web`     | Browser  |

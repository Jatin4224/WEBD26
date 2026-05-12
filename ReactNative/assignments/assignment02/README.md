# 📝 Notes App UI – React Native (Expo)

A simple and clean Notes App UI built using React Native and Expo.  
This project focuses on UI design, layout structuring, and React Native core concepts.

---

## 🚀 Project Overview

This assignment was built to practice:

- React Native core components
- Layout building and UI structuring
- Responsive mobile UI design
- Dark/Light theme handling
- Input handling and search functionality
- Clean styling practices

---

## 📱 Screens Implemented

### 1. Notes Listing Screen

This screen displays all notes in a clean, scrollable list.

#### Features:

- FlatList for rendering notes
- Each note card contains:
  - Title
  - Short preview/content snippet
  - Date or timestamp
- Search bar using TextInput
- Each note wrapped inside Pressable
- Dark/Light mode toggle (Switch)
- Clean card-based UI with proper spacing

---

### 2. Note Editor Screen

This screen is used for creating or editing notes.

#### Features:

- TextInput for note title
- Multiline TextInput for note content
- KeyboardAvoidingView to handle keyboard overlap
- ImageBackground header design
- Save button (Pressable)
- Back button (Pressable)
- Smooth writing experience with proper spacing

---

## 🎨 Theme Support

- Implemented using `useColorScheme()`
- Supports:
  - 🌞 Light Mode
  - 🌙 Dark Mode
- UI adapts dynamically based on system theme

---

## 📐 Responsive Design

- Uses `useWindowDimensions()` for responsiveness
- Works across:
  - Mobile screens
  - Tablets
  - Different screen sizes

---

## 🧠 React Native Concepts Used

- FlatList
- TextInput
- Pressable
- Switch
- KeyboardAvoidingView
- ImageBackground
- SafeAreaView
- StatusBar

---

## 🎨 Styling Approach

- All styles created using `StyleSheet.create()`
- Clean separation of UI and logic
- Consistent spacing and typography
- Minimal inline styling used
- UI focused on readability and structure

---

## 📸 Output Screenshots

### 🖼️ Notes Listing Screen

![Notes Listing](.assets/screenshots/screenshot01.assignment02.jpeg)

### 🖼️ Note Editor Screen

![Note Editor](./screenshots/note-editor.png)

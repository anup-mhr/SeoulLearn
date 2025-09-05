import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// import { AuthProvider } from "../store/AuthContext";
// import { CourseProvider } from "../store/CourseContext";
// import { ExamProvider } from "../store/ExamContext";
import { StatusBar, StyleSheet } from "react-native";
import { colors, theme } from "../styles/theme";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 400,
  fade: true,
});

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          // Load custom fonts here if needed
        });
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <PaperProvider theme={theme}>
        {/* <AuthProvider>
          <CourseProvider>
            <ExamProvider> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="course" />
          <Stack.Screen name="exam" />
          <Stack.Screen name="payment" />
        </Stack>
        {/* </ExamProvider>
          </CourseProvider>
        </AuthProvider> */}
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
});

import colors from "@/constants/color";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "../store/AuthContext";

export default function SplashScreen() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        if (user) {
          router.push("/(tabs)/dashboard");
        } else {
          router.push("/onboarding");
          // router.push("/(tabs)/dashboard");
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, user]);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      // style={styles.container}
      className="flex-1 justify-center items-center"
    >
      <View style={styles.content}>
        <Image
          cachePolicy="memory-disk"
          source={require("../assets/icons/adaptive-icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.title}>KoreaLearn</Text>
        <Text style={styles.subtitle}>Master Korean Language</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
});

import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
// import { useAuth } from "../store/AuthContext";
import { router } from "expo-router";
import { colors } from "../styles/theme";

export default function SplashScreen() {
  // const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      // if (!isLoading) {
      //   if (isAuthenticated) {
      // router.push("/(tabs)/dashboard");
      //   } else {
      // router.push("/onboarding");
      //   }
      // }
      router.push("/eSewaPaymentExample");
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  // [isLoading, isAuthenticated]);

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      // style={styles.container}
      className="flex-1 justify-center items-center"
    >
      <View style={styles.content}>
        <Image
          source={require("../assets/images/react-logo.png")}
          style={styles.logo}
          resizeMode="contain"
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

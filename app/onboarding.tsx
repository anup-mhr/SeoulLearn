import colors from "@/constants/color";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const onboardingData = [
  {
    id: 1,
    title: "Learn Korean Effectively",
    description:
      "Master Korean language with interactive lessons designed for Nepali students",
    image: require("../assets/icons/adaptive-icon.png"),
  },
  {
    id: 2,
    title: "Practice with Real Exams",
    description:
      "Prepare for Korean proficiency tests with mock exams and practice questions",
    image: require("../assets/icons/adaptive-icon.png"),
  },
  {
    id: 3,
    title: "Track Your Progress",
    description:
      "Monitor your learning journey and celebrate your achievements",
    image: require("../assets/icons/adaptive-icon.png"),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/(auth)/login");
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/login");
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          cachePolicy="memory-disk"
          source={currentItem.image}
          style={styles.image}
        />
        <Text style={styles.title}>{currentItem.title}</Text>
        <Text style={styles.description}>{currentItem.description}</Text>

        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleSkip}
          style={styles.skipButton}
          labelStyle={styles.skipButtonLabel}
        >
          Skip
        </Button>
        <Button mode="contained" onPress={handleNext} style={styles.nextButton}>
          {currentIndex === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.8,
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    opacity: 0.9,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: "row",
    marginTop: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginHorizontal: 4,
    transitionDuration: "300ms",
    transitionProperty: "width, background-color",
    transitionTimingFunction: "ease-in-out",
  },
  activeDot: {
    backgroundColor: "white",
    width: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  skipButton: {
    flex: 0.4,
    borderColor: "white",
  },
  skipButtonLabel: {
    color: "white",
  },
  nextButton: {
    flex: 0.5,
    backgroundColor: "white",
  },
});

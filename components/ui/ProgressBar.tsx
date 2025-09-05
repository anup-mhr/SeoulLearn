import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number; // Value between 0 and 1
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: ViewStyle;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  height = 8,
  backgroundColor = "#e0e0e0",
  progressColor = "#3b82f6",
  style,
}) => {
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  return (
    <View style={[styles.container, { height, backgroundColor }, style]}>
      <View
        style={[
          styles.progress,
          {
            width: `${clampedProgress * 100}%`,
            backgroundColor: progressColor,
            height: "100%",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 4,
  },
});

export default ProgressBar;

import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface LinearProgressBarProps {
  progress: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  progressColor?: string;
  style?: StyleProp<ViewStyle>;
}

const LinearProgressBar: React.FC<LinearProgressBarProps> = ({
  progress,
  height = 20,
  borderRadius = 20,
  backgroundColor = "#EEF0F5",
  progressColor = "#666C7A",
  style,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1); // clamp between 0 and 1

  return (
    <View
      style={[
        styles.container,
        {
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clampedProgress * 100}%`,
          height: "100%",
          backgroundColor: progressColor,
          borderRadius,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
});

export default LinearProgressBar;

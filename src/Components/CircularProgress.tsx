import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Svg, { Circle } from "react-native-svg";

interface ProgressCircleProps {
  radius: number;
  strokeWidth: number;
  progress: number; // Should be a value between 0 and 1
  color: string;
  backgroundColor?: string; // optional background color
  backgroundStrokeWidth?: number;
  progressStrokeWidth: number;
  children?: React.ReactNode;
}

const CircularProgress: React.FC<ProgressCircleProps> = ({
  radius,
  strokeWidth,
  progress,
  color,
  backgroundColor = "#eee",
  backgroundStrokeWidth = 10,
  progressStrokeWidth,
  children,
}) => {
  const circleRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg
        width={radius * 2}
        height={radius * 2}
        style={{ position: "absolute" }}
      >
        {/* Background Circle */}
        <Circle
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={backgroundStrokeWidth}
          cx={radius}
          cy={radius}
          r={circleRadius}
        />
        {/* Progress Circle */}
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={progressStrokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={circleRadius}
          rotation="-90"
          originX={radius}
          originY={radius}
        />
      </Svg>

      {/* Centered Content */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CircularProgress;

const styles = StyleSheet.create({});

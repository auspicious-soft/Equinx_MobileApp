import React, { FC } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import COLORS from "../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../Utilities/Metrics";
import { CustomText } from "./CustomText";
import LinearGradient from "react-native-linear-gradient";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  textColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  textSize?: number;
  isFullWidth?: boolean;
  bgColor?: string[];
  gradientStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  textColor = COLORS.white,
  style,
  textSize = 16,
  isFullWidth = true,
  bgColor = [COLORS.darkGreenGradient.start, COLORS.darkGreenGradient.end],
  gradientStyle,
  textStyle,
}) => {
  return (
    <LinearGradient
      colors={bgColor}
      style={[
        {
          borderRadius: verticalScale(10),
          opacity: disabled ? 0.5 : 1,
          alignItems: "center",
        },
        gradientStyle,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        style={[isFullWidth && styles.button, style]}
        onPress={onPress}
      >
        <CustomText
          fontFamily="bold"
          fontSize={textSize}
          color={textColor}
          style={textStyle}
        >
          {title}
        </CustomText>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    alignItems: "center",
    justifyContent: "center",
    width: wp(90),
    alignSelf: "center",
  },
});

export default PrimaryButton;

import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useEffect } from "react";
import { WelcomeScreenProps } from "../../Typings/route";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/Images";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../../Components/PrimaryButton";

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const imageAnim = React.useRef(new Animated.Value(-hp(50))).current; // Start from top
  const textAnim = React.useRef(new Animated.Value(-hp(50))).current; // Start from bottom
  const buttonAnim = React.useRef(new Animated.Value(hp(50))).current; // Start from bottom

  useEffect(() => {
    // Animate image/icon from top
    Animated.timing(imageAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate text from bottom
    Animated.timing(textAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate button from bottom (delay for staggered effect)
    Animated.timing(buttonAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
      delay: 300, // Delay to stagger animation
    }).start();
  }, [imageAnim, textAnim, buttonAnim]);

  return (
    <ImageBackground
      source={IMAGES.greenBg}
      imageStyle={{ flex: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            gap: verticalScale(15),
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: imageAnim }],
            }}
          >
            <Image source={IMAGES.welcomeImg} style={styles.imgeStyle} />
          </Animated.View>

          <Animated.View
            style={{
              transform: [{ translateY: textAnim }],
              width: "100%",
            }}
          >
            <View style={styles.contentContainer}>
              <CustomText
                fontSize={22}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                Welcome Companion
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
                style={{ textAlign: "center" }}
              >
                “Your personalized plan is loading. Are you ready for real
                change?”
              </CustomText>
            </View>
          </Animated.View>
        </View>
        <Animated.View
          style={{
            transform: [{ translateY: buttonAnim }],
            width: "100%",
          }}
        >
          <PrimaryButton
            title="Containue"
            onPress={() => {
              navigation.replace("tabs", {
                screen: "home",
              });
            }}
          />
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(25),
    // justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  imgeStyle: {
    height: hp(45),
    width: wp(90.9),
    resizeMode: "contain",
  },
  contentContainer: {
    // backgroundColor: "red",
    alignItems: "center",
    gap: verticalScale(10),
  },
});

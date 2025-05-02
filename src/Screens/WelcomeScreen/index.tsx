import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { WelcomeScreenProps } from "../../Typings/route";
import { SafeAreaView } from "react-native-safe-area-context";
import IMAGES from "../../Assets/Images";
import { hp, verticalScale, wp } from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../../Components/PrimaryButton";

const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
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
          }}
        >
          <Image source={IMAGES.welcomeImg} style={styles.imgeStyle} />
          <View style={styles.contentContainer}>
            <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
              Welcome Companion
            </CustomText>
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              Your intermittent fasting journey awaits you!
            </CustomText>
          </View>
        </View>
        <PrimaryButton
          title="Containue"
          onPress={() => {
            navigation.replace("tabs", {
              screen: "home",
            });
          }}
        />
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
    // justifyContent: "center",
  },
  gradient: {
    flex: 1,
  },
  imgeStyle: {
    height: hp(50),
    width: wp(90),
    resizeMode: "contain",
  },
  contentContainer: {
    // backgroundColor: "red",
    alignItems: "center",
    gap: verticalScale(10),
  },
});

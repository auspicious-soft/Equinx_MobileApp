import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import CustomInput from "../../Components/CustomInput";
import PrimaryButton from "../../Components/PrimaryButton";
import { ForgotPasswordScreenProps } from "../../Typings/route";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";

const ForgotPassword: FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleNavigaion = () => {
    navigation.navigate("otp", {
      isFrom: "forgotpassword",
    });
  };
  return (
    <LinearGradient
      colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
      style={styles.gradient}
      start={{ x: 0.3, y: 0 }} // Start from the top center
      end={{ x: 0.3, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingContainer
          style={{
            paddingBottom: verticalScale(20),
            paddingTop: verticalScale(40),
            paddingHorizontal: horizontalScale(20),
          }}
        >
          <View style={{ gap: verticalScale(10) }}>
            <Image source={IMAGES.mealImage} style={styles.mealImageStyle} />
            <View style={styles.textHeaderContainer}>
              <CustomText
                fontSize={22}
                fontFamily={"bold"}
                style={{ textAlign: "center" }}
              >
                Forgot Password?
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                style={{ textAlign: "center" }}
              >
                Enter the Phone Number/email associated with your account.
              </CustomText>
            </View>

            <View style={styles.footerContainer}>
              <CustomInput
                value={email}
                onChangeText={setEmail}
                label="Email/Phone"
                leftIcon={ICONS.profileIcon}
                placeholder="Enter your email"
                inputStyle={{
                  paddingVertical: verticalScale(15),
                }}
              />
              <PrimaryButton onPress={handleNavigaion} title="Confirm" />
              <View style={styles.rememberPasswordContainer}>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Remember Password?
                </CustomText>
                <TouchableOpacity onPress={() => navigation.replace("login")}>
                  <CustomText fontSize={12} color={COLORS.skyBlue}>
                    login
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingContainer>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingHorizontal: horizontalScale(20),
    // gap: verticalScale(10),
    // backgroundColor: "red",
    // paddingVertical: verticalScale(25),
  },
  backButton: {
    padding: horizontalScale(5),
  },
  mealImageStyle: {
    width: "100%",
    height: hp(25),
    resizeMode: "contain",
    marginVertical: 5,
    alignSelf: "center",
  },
  textHeaderContainer: {
    justifyContent: "center",
    gap: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    // backgroundColor:'red'
  },
  footerContainer: {
    gap: verticalScale(10),
    marginTop: verticalScale(15),
  },
  rememberPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: horizontalScale(5),
  },
});

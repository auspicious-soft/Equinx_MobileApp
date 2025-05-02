import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../../Components/PrimaryButton";
import { OTPScreenProps } from "../../Typings/route";
import NumberVerifyModal from "../../Components/Modals/NumberVerifyModal";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";

const otpScreen: FC<OTPScreenProps> = ({ navigation, route }) => {
  const { isFrom } = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleNavigation = () => {
    if (isFrom === "register") {
      setModalVisible(true);
    } else {
      navigation.navigate("createNewPassword");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    console.log(route, "agv");
  }, []);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        // If the current box has a value, clear it but stay in the same box
        newOtp[index] = "";
      } else if (index > 0) {
        // If moving back and the previous box has a value, clear it & move back
        if (otp[index - 1]) {
          newOtp[index - 1] = "";
        }
        inputs.current[index - 1]?.focus();
      }

      setOtp(newOtp);
    }
  };
  return (
    <KeyboardAvoidingContainer>
      <LinearGradient
        colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
        style={styles.gradient}
        start={{ x: 0.3, y: 0 }} // Start from the top center
        end={{ x: 0.3, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{
              gap: verticalScale(10),
              height: hp(100),
              paddingBottom: verticalScale(20),
              paddingTop: verticalScale(40),
              paddingHorizontal: horizontalScale(20),
            }}
          >
            <Image source={IMAGES.yogaImage_2} style={styles.mealImageStyle} />
            <View style={styles.textHeaderContainer}>
              <CustomText
                fontSize={22}
                fontFamily={"bold"}
                style={{ textAlign: "center" }}
              >
                Enter OTP
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                style={{ textAlign: "center" }}
              >
                Enter the OTP received on your phone or associated email
                address.
              </CustomText>
            </View>

            <View style={{ gap: verticalScale(10) }}>
              <View style={styles.inputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref: any) => (inputs.current[index] = ref)}
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#C5C9D0"
                    maxLength={1}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    autoFocus={index === 0}
                  />
                ))}
              </View>

              <View
                style={{ marginTop: verticalScale(10), gap: verticalScale(10) }}
              >
                <PrimaryButton title="Verify" onPress={handleNavigation} />
                <View style={styles.footerContainer}>
                  <CustomText fontSize={12} color={COLORS.oldGrey}>
                    Remember Password?
                  </CustomText>
                  <TouchableOpacity onPress={() => navigation.replace("login")}>
                    <CustomText fontSize={12} color={COLORS.skyBlue}>
                      Login
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <NumberVerifyModal
              isVisible={isModalVisible}
              closeModal={closeModal}
              onpress={() => navigation.navigate("login")}
              title="Phone Number Verified Successfully!"
              subTitle="Your Phone Number has been successfully verified. Please login to continue."
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingContainer>
  );
};

export default otpScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  inputContainer: {
    // backgroundColor: 'yellow',
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    justifyContent: "center",
    marginTop: verticalScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 14,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(5),
  },
});

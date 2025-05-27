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
import Toast from "react-native-toast-message";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { getLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";

const initialSeconds = 5;

const otpScreen: FC<OTPScreenProps> = ({ navigation, route }) => {
  const { isFrom, email } = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(initialSeconds);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const [fcmToken, setFcmToken] = useState(null);
  const [error, setError] = useState("");

  const validInputs = () => {
    let valid = true;
    let newErrors = "";
    if (!otp.some((item) => item.trim() === "")) {
      valid = false;
      newErrors = "Please enter a valid OTP.";
      Toast.show({
        type: "error",
        text1: "Please enter a valid OTP.",
      });
    }

    setError(newErrors);
    return valid;
  };

  const getFcmToken = async () => {
    const getToken = await getLocalStorageData(STORAGE_KEYS.fcmToken);
    console.log(getToken);
    if (getToken) {
      setFcmToken(getToken);
    }
  };

  useEffect(() => {
    getFcmToken();
  }, [fcmToken]);

  const handleNavigation = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data =
      isFrom === "register"
        ? {
            otp: otp.map((otp) => otp).join(""),
            email: email,
            fcmToken: fcmToken,
          }
        : {
            token: otp.map((otp) => otp).join(""),
            email: email,
          };

    try {
      const response = await postData(
        isFrom === "register" ? ENDPOINTS.otp : ENDPOINTS.forgotPasswordOtp,
        data
      );
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });

        if (isFrom === "register") {
          setModalVisible(true);
        } else {
          navigation.navigate("createNewPassword", {
            otp: otp.map((otp) => otp).join(""),
          });
        }
      }
    } catch (error: any) {
      console.log(error, "API ERROR");
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const handleResendOtp = async () => {
    const data =
      isFrom === "register"
        ? {
            email: email,
          }
        : {
            email: email,
          };

    try {
      const response = await postData(
        isFrom === "register" ? ENDPOINTS.resendOtp : ENDPOINTS.forgotPassword,
        data
      );
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "OTP Sent successfully.",
        });
      }
    } catch (error: any) {
      console.log(error, "API ERROR");
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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

  useEffect(() => {
    if (timeInSeconds <= 0) return; // Stop when timer reaches 0

    const interval = setInterval(() => {
      setTimeInSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // Clear interval when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [timeInSeconds]);

  // Format time in seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
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
                Enter the OTP received on your associated email address.
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

                {timeInSeconds !== 0 ? (
                  <View style={styles.footerContainer}>
                    <CustomText fontSize={12} color={COLORS.oldGrey}>
                      Resend Otp in
                    </CustomText>
                    <CustomText fontSize={12} color={COLORS.green}>
                      {formatTime(timeInSeconds)}
                    </CustomText>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                      setTimeInSeconds(initialSeconds);
                      handleResendOtp();
                    }}
                  >
                    <CustomText fontSize={12} color={COLORS.green}>
                      Resend Otp
                    </CustomText>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <NumberVerifyModal
              isVisible={isModalVisible}
              closeModal={closeModal}
              onpress={() => navigation.navigate("login")}
              title="Email Verified Successfully!"
              subTitle="Your Email has been successfully verified. Please login to continue."
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
    paddingHorizontal: horizontalScale(18),
    borderRadius: 14,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(5),
  },
});

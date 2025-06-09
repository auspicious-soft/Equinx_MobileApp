import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import CustomInput from "../../Components/CustomInput";
import PrimaryButton from "../../Components/PrimaryButton";
import { ForgotPasswordScreenProps } from "../../Typings/route";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";
import CustomIcon from "../../Components/CustomIcon";

const ForgotPassword: FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLaoding] = useState(false);
  const [error, setError] = useState({
    email: "",
  });

  const validInputs = () => {
    let valid = true;
    let newErrors = {
      email: "",
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      valid = false;
      newErrors.email = "Email is required.";
      Toast.show({
        type: "error",
        text1: "Email is required.",
      });
    } else if (!emailRegex.test(email)) {
      valid = false;
      newErrors.email = "Invalid email format.";
      Toast.show({
        type: "error",
        text1: "Invalid email format.",
      });
    }

    setError(newErrors);
    return valid;
  };

  const handleForgotPassword = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data = {
      email: email,
    };

    setIsLaoding(true);

    try {
      const response = await postData(ENDPOINTS.forgotPassword, data);
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("otp", {
          isFrom: "forgotpassword",
          email,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLaoding(false);
    }
  };
  return (
    <KeyboardAvoidingContainer scrollEnabled={true}>
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
                Enter the email associated with your account.
              </CustomText>
            </View>

            <View style={styles.footerContainer}>
              <View style={{ gap: verticalScale(5) }}>
                <CustomText
                  fontFamily="regular"
                  color={COLORS.oldGrey}
                  fontSize={14}
                >
                  Email
                </CustomText>
                <View style={styles.textInputContainer}>
                  <CustomIcon Icon={ICONS.profileIcon} height={16} width={16} />
                  <TextInput
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#C5C9D0"
                    style={{
                      paddingVertical: verticalScale(15),
                      flex: 1,
                    }}
                  />
                </View>
              </View>
              <PrimaryButton
                onPress={handleForgotPassword}
                title="Confirm"
                isLoading={isLoading}
              />
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
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingContainer>
  );
};

export default ForgotPassword;

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
  textInputContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    paddingHorizontal: horizontalScale(14),
    borderRadius: verticalScale(12),
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
});

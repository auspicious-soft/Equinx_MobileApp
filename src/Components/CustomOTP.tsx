import React, { FC, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Toast from "react-native-toast-message";
// import { patchData, postData } from "../../APIService/api";
// import ENDPOINTS from "../../APIService/endPoints";
// import ICONS from "../../Assets/ICONS";
// import CustomButton from "../../Components/Buttons/CustomButton";
// import CustomIcon from "../../Components/CustomIcon";
// import { CustomText } from "../../Components/CustomText";
// import { useAppSelector } from "../../Redux/store";
// import { OTPProps } from "../../Typings/route";
// import STORAGE_KEYS from "../../Utilities/Constants";
import { horizontalScale, verticalScale, wp } from "../Utilities/Metrics";
// import { storeLocalStorageData } from "../../Utilities/Storage";
// import styles from "./style";

const OTP= () => {
//   const { isFromForgotPassword, email } = route.params;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);

//   const { isRegistered } = useAppSelector((state) => state.initial);

//   const handleInputChange = (value: string, index: number) => {
//     if (!/^\d*$/.test(value)) {
//       Toast.show({
//         type: "error",
//         text1: "Invalid Otp",
//         text2: "Please enter only numbers",
//       });
//       return; // Ignore input if it's not a number
//     }
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

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

//   const handleContinue = async () => {
//     if (otp.some((item) => item.trim() === "")) {
//       Toast.show({
//         type: "error",
//         text1: "Please enter a valid OTP.",
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);
//       if (isFromForgotPassword) {
//         const response = await postData(ENDPOINTS.verifyPasswordOtp, {
//           otp: otp.map((otp) => otp).join(""),
//         });
//         if (response.data.success) {
//           navigation.pop(1);
//           navigation.replace("createNewPassword", {
//             otp: otp.map((otp) => otp).join(""),
//           });
//         } else {
//           Toast.show({
//             type: "error",
//             text1: response.data.message,
//           });
//         }
//       } else {
//         const response = await patchData(
//           ENDPOINTS.verifyEmail,
//           {
//             otp: otp.map((otp) => otp).join(""),
//           },
//           {
//             "x-client-type": "mobile",
//           }
//         );

//         if (response.data.success) {
//           await storeLocalStorageData(STORAGE_KEYS.token, response.data.data);
//           await storeLocalStorageData(STORAGE_KEYS.isAuth, true);
//           navigation.replace("mainStack", {
//             screen: "tabs",
//             params: { screen: "homeTab" },
//           });
//         } else {
//           Toast.show({
//             type: "error",
//             text1: response.data.message,
//           });
//         }
//       }
//     } catch (error: any) {
//       console.log(error);
//       setOtp(["", "", "", ""]);
//       inputs.current[0]?.focus();

//       Toast.show({
//         type: "error",
//         text1: error.message || "Something went wrong.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (isFromForgotPassword) {
//       try {
//         const response = await postData(ENDPOINTS.resendOtp, {
//           email: email?.toLocaleLowerCase(),
//           type: "forgotpassword",
//         });

//         if (response.data.success) {
//           Toast.show({
//             type: "success",
//             text1: response.data.message,
//           });
//         }
//       } catch (error: any) {
//         console.log(error);
//         Toast.show({
//           type: "error",
//           text1: error.message || "Somethig went wrong.",
//         });
//       }
//     } else {
//       if (isRegistered?.email) {
//         try {
//           const response = await postData(ENDPOINTS.resendOtp, {
//             email: isRegistered?.email,
//             type: "signUp",
//           });

//           if (response.data.success) {
//             Toast.show({
//               type: "success",
//               text1: response.data.message,
//             });
//           }
//         } catch (error: any) {
//           console.log(error);
//           Toast.show({
//             type: "error",
//             text1: error.message || "Login failed",
//           });
//         }
//       }
//     }
//   };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {/* <SafeAreaView style={styles.container}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.pop(2);
              navigation.goBack();
            }}
            style={{ paddingRight: horizontalScale(10), width: wp(8) }}
          >
            <CustomIcon Icon={ICONS.BackArrow} width={15} height={15} />
          </TouchableOpacity>
        )}

        <View style={styles.textContainer}>
          <CustomText type="subHeading" fontFamily="bold">
            Enter OTP
          </CustomText>
          <CustomText>
            We have just sent an email to you with a four digit code. Please
            enter this below.
          </CustomText>
        </View>

        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref: any) => (inputs.current[index] = ref)}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleInputChange(value, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <CustomButton
          title="Continue"
          onPress={handleContinue}
          isLoading={isLoading}
        />

        <CustomText style={styles.footerText}>
          Didn't receive code?{" "}
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={handleResendOtp}
            style={{ marginTop: verticalScale(4) }}
          >
            <CustomText fontFamily="bold" style={styles.signInLink}>
              Resend Code
            </CustomText>
          </TouchableOpacity>
        </CustomText>
      </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default OTP;
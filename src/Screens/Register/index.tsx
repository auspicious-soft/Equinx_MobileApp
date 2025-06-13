import React, { FC, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import DeviceInfo, { getDeviceId } from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import PrimaryButton from "../../Components/PrimaryButton";
import { RegisterScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";

const Register: FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validInputs = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!name.trim()) {
      valid = false;
      newErrors.name = "Name is required.";
      Toast.show({
        type: "error",
        text1: "Name is required.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      valid = false;
      newErrors.email = "Email is required.";
      Toast.show({
        type: "error",
        text1: "Email is required.",
      });
      return;
    } else if (!emailRegex.test(email)) {
      valid = false;
      newErrors.email = "Invalid email format.";
      Toast.show({
        type: "error",
        text1: "Invalid email format.",
      });
      return;
    }

    if (!password.trim()) {
      valid = false;
      newErrors.password = "Password is required.";
      Toast.show({
        type: "error",
        text1: "Password is required.",
      });
      return;
    }

    if (!confirmPassword.trim()) {
      valid = false;
      newErrors.confirmPassword = "Confirm Password is required.";
      Toast.show({
        type: "error",
        text1: "Confirm Password is required.",
      });
      return;
    } else if (password !== confirmPassword) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match.";
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
      return;
    }

    if (!phone.trim()) {
      valid = false;
      newErrors.confirmPassword = "Phone number is required.";
      Toast.show({
        type: "error",
        text1: "Phone number is required.",
      });
    }

    setIsError(newErrors);
    return valid;
  };

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handleSignUp = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data = {
      fullName: name,
      email: email,
      countryCode: country?.callingCode.toString(),
      phoneNumber: phone,
      deviceId: await DeviceInfo.getUniqueId(),
      password: password,
      authType: "Email",
    };
    setIsLoading(true);
    // console.log(data);
    try {
      const response = await postData(ENDPOINTS.signUp, data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.navigate("otp", {
          isFrom: "register",
          email,
        });
      }
    } catch (error: any) {
      console.log(error, "API ERROR");
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  console.log(getDeviceId());

  return (
    <KeyboardAvoidingContainer>
      <LinearGradient
        colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
        style={styles.gradient}
        start={{ x: 0.3, y: 0 }} // Start from the top center
        end={{ x: 0.3, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={{
              gap: verticalScale(10),
              paddingBottom: verticalScale(20),
              paddingTop: verticalScale(40),
              paddingHorizontal: horizontalScale(20),
            }}
            keyboardShouldPersistTaps="handled"
          >
            <Image source={IMAGES.mealImage_2} style={styles.mealImageStyle} />

            <View style={styles.contentContainer}>
              <View style={styles.headerTextContainer}>
                <CustomText fontSize={22} fontFamily={"bold"}>
                  Register
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  Create a new account to continue.
                </CustomText>
              </View>

              <View
                style={{ marginTop: verticalScale(15), gap: verticalScale(10) }}
              >
                <View style={{ gap: verticalScale(5) }}>
                  <CustomText
                    fontFamily="regular"
                    color={COLORS.oldGrey}
                    fontSize={14}
                  >
                    Full Name
                  </CustomText>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      placeholder="Enter your name"
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor="#C5C9D0"
                      style={{
                        paddingVertical: verticalScale(15),
                        flex: 1,
                      }}
                    />
                  </View>
                </View>
                <View style={{ gap: verticalScale(5) }}>
                  <CustomText
                    fontFamily="regular"
                    color={COLORS.oldGrey}
                    fontSize={14}
                  >
                    Email Address
                  </CustomText>
                  <View style={styles.textInputContainer}>
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

                <View style={{ gap: verticalScale(5) }}>
                  <CustomText
                    fontFamily="regular"
                    color={COLORS.oldGrey}
                    fontSize={14}
                  >
                    Create Password
                  </CustomText>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      placeholder="***********"
                      value={password}
                      onChangeText={setPassword}
                      placeholderTextColor="#C5C9D0"
                      secureTextEntry={!isPasswordVisible}
                      style={{
                        paddingVertical: verticalScale(15),
                        flex: 1,
                      }}
                    />

                    <CustomIcon
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      Icon={
                        isPasswordVisible ? ICONS.EyeOnIcon : ICONS.EyeOffIcon
                      }
                      height={16}
                      width={16}
                    />
                  </View>
                </View>
                <View style={{ gap: verticalScale(5) }}>
                  <CustomText
                    fontFamily="regular"
                    color={COLORS.oldGrey}
                    fontSize={14}
                  >
                    Confirm Password
                  </CustomText>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      placeholder="***********"
                      value={confirmPassword}
                      onChangeText={setconfirmPassword}
                      placeholderTextColor="#C5C9D0"
                      secureTextEntry={!isShowConfirmPassword}
                      style={{
                        paddingVertical: verticalScale(15),
                        flex: 1,
                      }}
                    />

                    <CustomIcon
                      onPress={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                      Icon={
                        isShowConfirmPassword
                          ? ICONS.EyeOnIcon
                          : ICONS.EyeOffIcon
                      }
                      height={16}
                      width={16}
                    />
                  </View>
                </View>

                <View style={{ gap: verticalScale(5) }}>
                  <CustomText fontSize={12} color={COLORS.oldGrey}>
                    Phone Number
                  </CustomText>
                  <View style={styles.phoneInputContainer}>
                    <TouchableOpacity
                      onPress={() => setShowCountryPicker(true)}
                      style={styles.countryPickerContainer}
                    >
                      <CountryPicker
                        {...{
                          countryCode,
                          withFlag: true,
                          withFilter: true,
                          withCallingCode: true,
                          withCountryNameButton: false,
                          onSelect,
                        }}
                        visible={showCountryPicker}
                        onClose={() => setShowCountryPicker(false)}
                        theme={{
                          onBackgroundTextColor: COLORS.lightGrey,
                          flagSizeButton: 20,
                        }}
                      />

                      <CustomIcon
                        Icon={ICONS.ArrowDownIcon}
                        height={10}
                        width={10}
                      />
                    </TouchableOpacity>
                    <View style={styles.numberWithCallingContainer}>
                      <CustomText fontSize={14} color={COLORS.oldGrey}>
                        {`${country ? `(${country?.callingCode})` : ""}`}
                      </CustomText>
                      <TextInput
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#D1D4D8"
                        style={styles.inputStyle}
                        keyboardType="number-pad"
                        value={phone}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <PrimaryButton
                title="Register"
                onPress={handleSignUp}
                isLoading={isLoading}
              />
              <View style={styles.footerContainer}>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Already have an account?
                </CustomText>
                <TouchableOpacity onPress={() => navigation.replace("login")}>
                  <CustomText fontSize={12} color={COLORS.skyBlue}>
                    Login
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingContainer>
  );
};

export default Register;

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
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
  },
  contentContainer: {
    marginTop: verticalScale(5),
    gap: verticalScale(10),
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(5),
  },
  phoneInputContainer: {
    // backgroundColor:'red',
    borderWidth: 1.5,
    borderColor: COLORS.greyishWhite,
    borderRadius: 8,
    flexDirection: "row",
    gap: horizontalScale(5),
    // alignItems:'center'
  },
  inputStyle: {
    flex: 1,
    paddingVertical: verticalScale(15),
    // backgroundColor:'red',
    marginRight: horizontalScale(5),
  },
  countryPickerContainer: {
    borderEndWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(5),
    flexDirection: "row",
    borderColor: COLORS.greyishWhite,
  },
  numberWithCallingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
    flex: 1,
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

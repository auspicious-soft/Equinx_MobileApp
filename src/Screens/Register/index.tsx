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
import DeviceInfo from "react-native-device-info";
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
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country | null>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handleNavigation = async () => {
    const data = {
      fullName: name,
      email: email,
      countryCode: countryCode,
      phoneNumber: phone,
      deviceId: DeviceInfo.getUniqueId(),
      password: password,
      authType: "Email",
    };
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
          <ScrollView
            style={{
              gap: verticalScale(10),
              paddingBottom: verticalScale(20),
              paddingTop: verticalScale(40),
              paddingHorizontal: horizontalScale(20),
            }}
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
                <CustomInput
                  label="Full Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />

                <CustomInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />

                <CustomInput
                  label="Create Password"
                  type="password"
                  value={password}
                  onChangeText={setpassword}
                  placeholder="********"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />

                <CustomInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChangeText={setconfirmPassword}
                  placeholder="********"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />

                <View style={{ gap: verticalScale(5) }}>
                  <CustomText fontSize={12} color={COLORS.oldGrey}>
                    Phone Number (optional)
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

              <PrimaryButton title="Register" onPress={handleNavigation} />
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
});

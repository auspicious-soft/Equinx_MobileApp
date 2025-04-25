import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
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
import { RegisterScreenProps } from "../../Typings/route";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";

const Register: FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country | null>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handleNavigation = () => {
    navigation.navigate("otp", {
      isFrom: "register",
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
            // gap: verticalScale(10),
            paddingBottom: verticalScale(20),
            paddingTop: verticalScale(40),
            paddingHorizontal: horizontalScale(20),
          }}
        >
          {/* {navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <CustomIcon Icon={ICONS.BackArrow} height={30} width={30} />
            </TouchableOpacity>
          )} */}

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
        </KeyboardAvoidingContainer>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Register;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingHorizontal: horizontalScale(20),
    // backgroundColor: "red",
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

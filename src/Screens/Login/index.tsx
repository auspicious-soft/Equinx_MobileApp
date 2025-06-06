import React, { FC, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import PrimaryButton from "../../Components/PrimaryButton";
import { LoginScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";
import {
  deleteLocalStorageData,
  getLocalStorageData,
  storeLocalStorageData,
} from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import { loginAPiResponse } from "../../Typings/apiResponse";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth, { onAuthStateChanged } from "@react-native-firebase/auth";

const Login: FC<LoginScreenProps> = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true); // For Firebase Auth status
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<string | null>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeCheckBox, setActiveCheckBox] = useState<
    "ActiveBox" | "nonActive"
  >("nonActive");
  const [fcmToken, setFcmToken] = useState(null);
  const [isError, setIsError] = useState({
    email: "",
    password: "",
  });

  const validInputs = () => {
    let valid = true;
    let newErrors = {
      email: "",
      password: "",
    };
    if (!email) {
      valid = false;
      newErrors.email = "Email is required.";
      Toast.show({
        type: "error",
        text1: "Email is required.",
      });
    }

    if (!password) {
      valid = false;
      newErrors.password = "Password is required.";
      Toast.show({
        type: "error",
        text1: "Password is required.",
      });
    }

    setIsError(newErrors);
    return valid;
  };

  const toggleCheckBox = () => {
    setActiveCheckBox((prev) =>
      prev === "ActiveBox" ? "nonActive" : "ActiveBox"
    );
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("Google Sign-In Success:", userInfo);
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Sign In Cancelled", "User cancelled the sign in flow.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert(
          "Sign In In Progress",
          "Operation (e.g. sign in) is already in progress."
        );
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          "Play Services Not Available",
          "Google Play Services not available or outdated."
        );
      } else {
        Alert.alert("Sign In Error", error.message);
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "203391657684-114uktiehnnml86as45u99jmhsmov837.apps.googleusercontent.com",
    });
  }, []);

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

  const handleLogin = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data = {
      email: email,
      password: password,
      authType: "Email",
      fcmToken: fcmToken,
    };

    setIsLoading(true);

    try {
      const response = await postData<loginAPiResponse>(ENDPOINTS.signin, data);
      console.log(response.data);
      if (response.data.success) {
        await storeLocalStorageData(
          STORAGE_KEYS.token,
          response.data.data.token
        );

        //  Saved credentials
        if (activeCheckBox === "ActiveBox") {
          await storeLocalStorageData(STORAGE_KEYS.credentials, {
            email,
            password,
          });
        } else {
          await deleteLocalStorageData(STORAGE_KEYS.credentials);
        }

        const isWelcomeScreen = await getLocalStorageData(
          STORAGE_KEYS.isWelcomeScreen
        );

        console.log("iswelcome", isWelcomeScreen);

        Toast.show({
          type: "success",
          text1: response.data.message,
        });

        if (isWelcomeScreen) {
          navigation.replace("mainStack", {
            screen: "tabs",
            params: {
              screen: "home",
            },
          });
        } else {
          navigation.replace("mainStack", {
            screen: "Welcome",
          });
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get Credtientials from local storage

  const loadSavedCredintails = async () => {
    const getCredientials = await getLocalStorageData(STORAGE_KEYS.credentials);
    if (getCredientials) {
      setEmail(getCredientials.email);
      setPassword(getCredientials.password);
      setActiveCheckBox("ActiveBox");
    }
  };

  useEffect(() => {
    loadSavedCredintails();
  }, []);

  return (
    <KeyboardAvoidingContainer>
      <LinearGradient
        colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
        style={styles.gradient}
        start={{ x: 0.3, y: 0 }} // Start from the top center
        end={{ x: 0.3, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ gap: verticalScale(10) }}>
            <Image source={IMAGES.yogaImage} style={styles.yogaImageStyle} />

            <View style={styles.textHeaderContainer}>
              <CustomText
                fontSize={22}
                fontFamily={"bold"}
                style={{ textAlign: "center" }}
              >
                Let's personalize your fasting journey!
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                style={{ textAlign: "center" }}
              >
                Sign up to save your progress, track your fasting, and get
                tailored insights.
              </CustomText>
            </View>

            <View style={styles.inputContainer}>
              <CustomInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                leftIcon={ICONS.profileIcon}
                placeholder="Enter your email"
                inputStyle={{
                  paddingVertical: verticalScale(15),
                }}
              />

              <CustomInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                type="password"
                placeholder="*********"
                inputStyle={{
                  paddingVertical: verticalScale(15),
                }}
              />
            </View>

            <View style={styles.remember_forgotContainer}>
              <TouchableOpacity
                style={styles.rememberContainer}
                onPress={toggleCheckBox}
              >
                <View>
                  {activeCheckBox === "ActiveBox" ? (
                    <CustomIcon
                      Icon={ICONS.activeCheckBox}
                      height={13}
                      width={13}
                    />
                  ) : (
                    <CustomIcon Icon={ICONS.checkBox} height={13} width={13} />
                  )}
                </View>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Remember me
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("forgotpassword")}
              >
                <CustomText fontSize={12} color={COLORS.skyBlue}>
                  Forgot Password ?
                </CustomText>
              </TouchableOpacity>
            </View>

            <PrimaryButton
              title="Log in"
              onPress={handleLogin}
              textSize={20}
              isLoading={isLoading}
            />

            <View style={styles.footerTextContainer}>
              <View style={styles.dontAccountContainer}>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Don't have an account?
                </CustomText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("register")}
                >
                  <CustomText fontSize={12} color={COLORS.skyBlue}>
                    Create one.
                  </CustomText>
                </TouchableOpacity>
              </View>
              <CustomText fontSize={12} color={COLORS.oldGrey}>
                - Or continue with -
              </CustomText>
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.googleBtnContainer}
                onPress={signIn}
              >
                <CustomIcon Icon={ICONS.googleIcon} height={17} width={17} />
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Google
                </CustomText>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.googleBtnContainer}>
                <CustomIcon Icon={ICONS.faceBookIcon} height={17} width={17} />
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Facebook
                </CustomText>
              </TouchableOpacity> */}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: verticalScale(20),
    paddingTop: verticalScale(40),
    paddingHorizontal: horizontalScale(20),
  },
  backButton: {
    padding: horizontalScale(5),
  },
  yogaImageStyle: {
    width: "100%",
    height: hp(25),
    resizeMode: "contain",
    marginVertical: 5,
    alignSelf: "center",
  },
  textHeaderContainer: {
    justifyContent: "center",
    gap: verticalScale(5),
    paddingHorizontal: horizontalScale(15),
  },
  inputContainer: {
    gap: verticalScale(10),
    marginTop: verticalScale(10),
  },
  remember_forgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dontAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
  footerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(15),
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
    justifyContent: "center",
  },
  googleBtnContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),

    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    justifyContent: "center",
    flex: 1,
  },
});

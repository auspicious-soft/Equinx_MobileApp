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
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import CustomInput from "../../Components/CustomInput";
import PrimaryButton from "../../Components/PrimaryButton";
import { CreatePasswordScreenProps } from "../../Typings/route";
import NumberVerifyModal from "../../Components/Modals/NumberVerifyModal";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";

const CreatePassword: FC<CreatePasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const { otp } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const closeModal = () => {
    setModalVisible(false);
  };

  const validInputs = () => {
    let valid = true;
    let newErrors = {
      newPassword: "",
      confirmPassword: "",
    };
    if (!newPassword) {
      valid = false;
      newErrors.newPassword = "New Password is required.";
      Toast.show({
        type: "error",
        text1: "New Password is required.",
      });
      return;
    } else if (newPassword.length < 6) {
      valid = false;
      return;
    } else if (newPassword !== confirmPassword) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match.";
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
      return;
    }

    setError(newErrors);
    return valid;
  };

  const handleCreatePassword = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data = {
      password: newPassword,
      otp: otp,
    };

    setIsLoading(true);

    const response = await postData(ENDPOINTS.createPassword, data);
    console.log(response.data);

    try {
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        setModalVisible(true);
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
            <Image source={IMAGES.yogaImage_3} style={styles.mealImageStyle} />
            <View style={styles.contentContainer}>
              <View style={styles.headerTextContainer}>
                <CustomText fontSize={22} fontFamily={"bold"}>
                  Create a new Password
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  Create new password at least 8 digit long.
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
                    New Password
                  </CustomText>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      placeholder="***********"
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholderTextColor="#C5C9D0"
                      secureTextEntry={!isShowNewPassword}
                      style={{
                        paddingVertical: verticalScale(15),
                        flex: 1,
                      }}
                    />

                    <CustomIcon
                      onPress={() => setIsShowNewPassword(!isShowNewPassword)}
                      Icon={
                        isShowNewPassword ? ICONS.EyeOnIcon : ICONS.EyeOffIcon
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
                      onChangeText={setConfirmPassword}
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
              </View>

              <PrimaryButton
                title="Create New Password"
                onPress={handleCreatePassword}
                isLoading={isLoading}
              />
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

              <NumberVerifyModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                onpress={() => navigation.replace("login")}
                title="Password Updated Successfully!"
                subTitle="Your password has been updated successfully. Please login to continue."
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingContainer>
  );
};

export default CreatePassword;

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
  contentContainer: {
    marginTop: verticalScale(10),
    gap: verticalScale(10),
  },
  headerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

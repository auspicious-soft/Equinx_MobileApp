import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { ChangePasswordScreenProps } from "../../Typings/route";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import CustomInput from "../../Components/CustomInput";
import PrimaryButton from "../../Components/PrimaryButton";
import Toast from "react-native-toast-message";
import { putData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { useLanguage } from "../../Context/LanguageContext";

const ChangePassword: FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);

  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validInputs = () => {
    let valid = true;
    let newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    if (!oldPassword) {
      valid = false;
      newErrors.oldPassword = "Old Password is required.";
      Toast.show({
        type: "error",
        text1: "Old Password is required.",
      });
    }
    if (!newPassword) {
      valid = false;
      newErrors.newPassword = "New Password is required.";
      Toast.show({
        type: "error",
        text1: "New Password is required.",
      });
    }
    if (!confirmPassword) {
      valid = false;
      newErrors.confirmPassword = "Confirm Password is required.";
      Toast.show({
        type: "error",
        text1: "Confirm Password is required.",
      });
    } else if (newPassword !== confirmPassword) {
      valid = false;
      newErrors.confirmPassword = "Passwords do not match.";
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
    }

    setError(newErrors);
    return valid;
  };

  const handlePassword = async () => {
    if (!validInputs()) {
      return; // Stop execution if validation fails
    }
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    setIsButtonLoading(true);
    try {
      const response = await putData(ENDPOINTS.changePassword, data);
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        setConfirmPassword("");
        setNewPassword("");
        setNewPassword("");
        navigation.replace("tabs", {
          screen: "settings",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsButtonLoading(false);
    }
  };
  return (
    <KeyboardAvoidingContainer bounce style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.change_password}
          </CustomText>
        </View>

        <View style={{ gap: verticalScale(20) }}>
          <View style={{ gap: verticalScale(10) }}>
            <View style={{ gap: verticalScale(5) }}>
              <CustomText
                fontFamily="regular"
                color={COLORS.oldGrey}
                fontSize={14}
              >
                Old Password
              </CustomText>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="***********"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  placeholderTextColor="#C5C9D0"
                  secureTextEntry={!isShowOldPassword}
                  style={{
                    paddingVertical: verticalScale(15),
                    flex: 1,
                  }}
                />

                <CustomIcon
                  onPress={() => setIsShowOldPassword(!isShowOldPassword)}
                  Icon={isShowOldPassword ? ICONS.EyeOnIcon : ICONS.EyeOffIcon}
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
                  Icon={isShowNewPassword ? ICONS.EyeOnIcon : ICONS.EyeOffIcon}
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
                    isShowConfirmPassword ? ICONS.EyeOnIcon : ICONS.EyeOffIcon
                  }
                  height={16}
                  width={16}
                />
              </View>
            </View>
          </View>
          <PrimaryButton
            onPress={handlePassword}
            title={translations.save_details}
            isLoading={isButtonLoading}
          />
          <View style={{ gap: verticalScale(8) }}>
            <CustomText
              fontSize={12}
              fontFamily="bold"
              color={COLORS.darkBLue}
              style={{ textAlign: "center" }}
            >
              {translations.or}
            </CustomText>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("authStack", {
                  screen: "forgotpassword",
                });
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.userIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                {translations.reset_password}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingContainer>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(30),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(10),
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
  iconBg: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
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

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const ChangePassword: FC<ChangePasswordScreenProps> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
            Change Password
          </CustomText>
        </View>

        <View style={{ gap: verticalScale(20) }}>
          <View style={{ gap: verticalScale(10) }}>
            <CustomInput
              onChangeText={setOldPassword}
              value={oldPassword}
              label="Old Password"
              placeholder="*********"
            />
            <CustomInput
              onChangeText={setNewPassword}
              value={newPassword}
              label="New Password"
              placeholder="*********"
            />
            <CustomInput
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              label="Confirm Password"
              placeholder="*********"
            />
          </View>
          <PrimaryButton
            onPress={() => {
              navigation.replace("tabs", {
                screen: "settings",
              });
            }}
            title="Save Details"
          />
          <View style={{ gap: verticalScale(8) }}>
            <CustomText
              fontSize={12}
              fontFamily="bold"
              color={COLORS.darkBLue}
              style={{ textAlign: "center" }}
            >
              Or
            </CustomText>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.userIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Reset Password
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
});

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
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
import { CreatePasswordScreenProps } from "../../Typings/route";
import NumberVerifyModal from "../../Components/Modals/NumberVerifyModal";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";

const CreatePassword: FC<CreatePasswordScreenProps> = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleNavigation = () => {
    navigation.replace("login");
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
                <CustomInput
                  label="New Password"
                  placeholder="********"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  type="password"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />
                <CustomInput
                  label="Confirm Password"
                  placeholder="********"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  type="password"
                  inputStyle={{
                    paddingVertical: verticalScale(15),
                  }}
                />
              </View>

              <PrimaryButton
                title="Create New Password"
                onPress={() => setModalVisible(true)}
              />
              <View style={styles.footerContainer}>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  Remember Password?
                </CustomText>
                <TouchableOpacity onPress={handleNavigation}>
                  <CustomText fontSize={12} color={COLORS.skyBlue}>
                    Login
                  </CustomText>
                </TouchableOpacity>
              </View>

              <NumberVerifyModal
                isVisible={isModalVisible}
                closeModal={closeModal}
                onpress={() => navigation.navigate("login")}
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
});

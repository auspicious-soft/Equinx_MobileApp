import {
  Animated,
  Easing,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { SettingsScreenProps } from "../../Typings/route";

const Settings: FC<SettingsScreenProps> = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isToggled ? 0 : 1;

    Animated.timing(toggleAnim, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setIsToggled(!isToggled);
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // This depends on your knob/container width
  });
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.headerView}>
          <View style={styles.circleView}>
            <Image source={IMAGES.userImg} style={styles.userImg} />
          </View>
          <View
            style={{
              gap: verticalScale(10),
            }}
          >
            <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
              Miley Jones
            </CustomText>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(5),
              }}
            >
              <TouchableOpacity>
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={COLORS.green}
                >
                  Edit Profile
                </CustomText>
                <View
                  style={{
                    height: 1,
                    backgroundColor: COLORS.green,
                  }}
                />
              </TouchableOpacity>
              <CustomIcon Icon={ICONS.rightGreenArrow} height={13} width={13} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            Account
          </CustomText>
          <View style={{ gap: verticalScale(4) }}>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("profile");
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.userIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                My Profile
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.lockIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Change Password
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon
                  Icon={ICONS.memberShipIcon}
                  height={16}
                  width={16}
                />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Membership
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            App
          </CustomText>
          <View style={{ gap: verticalScale(4) }}>
            <TouchableOpacity style={styles.profileContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: horizontalScale(10),
                  flex: 1,
                }}
              >
                <View style={styles.iconBg}>
                  <CustomIcon Icon={ICONS.notifyIcon} height={16} width={16} />
                </View>
                <CustomText fontSize={14} fontFamily="regular">
                  Notification
                </CustomText>
              </View>
              <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                <Animated.View
                  style={{
                    width: 40,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: COLORS.greyishWhite,
                    padding: 2,
                    justifyContent: "center",
                  }}
                >
                  <Animated.View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: COLORS.green,
                      transform: [{ translateX }],
                    }}
                  />
                </Animated.View>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.networkIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Language
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.heartIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Sync
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.bookIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Learn How to Fast
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            Support
          </CustomText>
          <View style={{ gap: verticalScale(4) }}>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.supportIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Get Support
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.rateUsIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Rate Us
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.policyIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Terms & Conditions
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileContainer}>
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.policyIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Privacy Policy
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            Support
          </CustomText>
          <TouchableOpacity style={styles.profileContainer}>
            <View style={styles.iconBg}>
              <CustomIcon Icon={ICONS.supportIcon} height={16} width={16} />
            </View>
            <CustomText fontSize={14} fontFamily="regular">
              Log Out
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  circleView: {
    borderWidth: 1,
    height: Platform.OS === "ios" ? hp(12.6) : hp(14),
    width: Platform.OS === "ios" ? wp(27.4) : wp(30),
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.green,
  },
  userImg: {
    height: Platform.OS === "ios" ? hp(11.9) : hp(13),
    width: Platform.OS === "ios" ? wp(25.9) : wp(27),
    borderRadius: 60,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    gap: verticalScale(20),
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

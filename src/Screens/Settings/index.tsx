import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  hp,
  isIOS,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { SettingsScreenProps } from "../../Typings/route";
import { deleteLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { SettingResponse } from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setSettingData } from "../../Redux/slices/settingSlice";

const Settings: FC<SettingsScreenProps> = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { settingData } = useAppSelector((state) => state.settingData);

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

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<SettingResponse>(ENDPOINTS.settings);
      console.log(response);
      if (response.data.success) {
        dispatch(setSettingData(response.data.data));
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

  const handleLogOut = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => {
          deleteLocalStorageData(STORAGE_KEYS.token);
          navigation.replace("authStack", {
            screen: "login",
          });
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
        }}
      >
        <ActivityIndicator color={COLORS.green} size={30} />
      </View>
    );
  }

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
              {settingData?.editProfile.fullName}
            </CustomText>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(5),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("EditProfile", {
                    userData: settingData?.editProfile,
                  });
                }}
              >
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
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.lockIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Change Password
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("UserMemberShip");
              }}
            >
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
                  Notifications
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
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("LanguageScreen");
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.networkIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                Language
              </CustomText>
            </TouchableOpacity>
            {isIOS && (
              <TouchableOpacity
                style={styles.profileContainer}
                onPress={() => {
                  navigation.navigate("Sync");
                }}
              >
                <View style={styles.iconBg}>
                  <CustomIcon Icon={ICONS.heartIcon} height={16} width={16} />
                </View>
                <CustomText fontSize={14} fontFamily="regular">
                  Sync
                </CustomText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("LearnFast");
              }}
            >
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
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("Support");
              }}
            >
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
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("Policy");
              }}
            >
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
            Sign Out
          </CustomText>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={handleLogOut}
          >
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
    height: hp(14.5),
    width: hp(14.5),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.green,
  },
  userImg: {
    height: hp(13.7),
    width: wp(28.9),
    borderRadius: 100,
    resizeMode: "contain",
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

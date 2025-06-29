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
import { CustomText } from "../../Components/CustomText";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { SettingsScreenProps } from "../../Typings/route";
import {
  deleteLocalStorageData,
  getLocalStorageData,
} from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";
import Toast from "react-native-toast-message";
import { fetchData, postData, putData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { SettingResponse } from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setSettingData } from "../../Redux/slices/settingSlice";
import { IMAGE_BASE_URL } from "@env";
import RateUs from "../../Components/Modals/RateUs";
import { useLanguage } from "../../Context/LanguageContext";
import IMAGES from "../../Assets/Images";
import { setNotification } from "../../Redux/slices/NotificationSlice";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import NotificationService from "../../Services/NotificationService";
import auth from "@react-native-firebase/auth";

const Settings: FC<SettingsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { notification } = useAppSelector((state) => state.notification);
  const { settingData } = useAppSelector((state) => state.settingData);
  const { translations } = useLanguage();
  const [isToggled, setIsToggled] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [fcmToken, setFcmToken] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    const toValue = isToggled ? 0 : 1;

    Animated.timing(toggleAnim, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Handle the notification state change
    setIsToggled(!isToggled);
    if (isToggled) {
      dispatch(setNotification(true));
    } else {
      dispatch(setNotification(false));
    }
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // This depends on your knob/container width
  });

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<SettingResponse>(ENDPOINTS.settings);
      console.log("userData response", response);
      if (response.data.success) {
        setIsToggled(response.data.data.mealReminder);
        Animated.timing(toggleAnim, {
          toValue: response.data.data.mealReminder ? 1 : 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
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

  const handleNotification = async () => {
    const nextValue = !isToggled;
    const data = {
      mealReminder: nextValue,
    };
    console.log("Notification data", data);

    try {
      const response = await putData(ENDPOINTS.settingsUpdate, data);
      console.log(response);

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        setIsToggled(nextValue); // update state only after success
        dispatch(setNotification(nextValue));
        fetchUser();
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const handleLogOut = () => {
    Alert.alert(translations.logOut, translations.are_you_sure, [
      {
        text: translations.cancel,
        style: "cancel",
      },
      {
        text: translations.confirm,
        onPress: async () => {
          const data = {
            fcmToken: fcmToken,
          };

          const isGoogleLogin = await getLocalStorageData(
            STORAGE_KEYS.loginWithGoogle
          );

          console.log("isGoogleLogin", isGoogleLogin);

          try {
            const response = await postData(ENDPOINTS.logOut, data);
            console.log(response.data);
            if (response.data.success) {
              if (isGoogleLogin) {
                await GoogleSignin.signOut();
              }
              // await auth().signOut();
              // Toast.show({
              //   type: "success",
              //   text1: response.data.message,
              // });

              deleteLocalStorageData(STORAGE_KEYS.token);
              navigation.replace("authStack", {
                screen: "login",
              });
            }
          } catch (error: any) {
            Toast.show({
              type: "error",
              text1: error.message || "Something went wrong",
            });
          }
        },
      },
    ]);
  };

  // console.log("profilepicdata ---->", settingData?.editProfile.profilePic);

  useEffect(() => {
    fetchUser();
  }, []);

  const getFcmToken = async () => {
    const token = await getLocalStorageData(STORAGE_KEYS.fcmToken);
    if (token) {
      setFcmToken(token);
    }
  };

  useEffect(() => {
    getFcmToken();
  }, [fcmToken]);

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
            {settingData?.editProfile.profilePic ? (
              <Image
                source={{
                  uri: IMAGE_BASE_URL + settingData?.editProfile.profilePic,
                }}
                style={styles.userImg}
              />
            ) : (
              <Image source={IMAGES.userPlaceholder} style={styles.userImg} />
            )}
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
                  {translations.edit_profile}
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
            {translations.account}
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
                {translations.My_profile}
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
                {translations.change_password}
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
                {translations.membership}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            {translations.app}
          </CustomText>
          <View style={{ gap: verticalScale(4) }}>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={handleNotification}
            >
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
                  {translations.mealReminder}
                </CustomText>
              </View>

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
                    backgroundColor: isToggled
                      ? COLORS.green
                      : COLORS.slateGrey,
                    transform: [{ translateX }],
                  }}
                />
              </Animated.View>
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
                {translations.languages}
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
                  {translations.sync_your_data}
                </CustomText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("LearnFast", {
                  data: null,
                });
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.bookIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                {translations.learn_fast}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            {translations.support}
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
                {translations.get_support}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.rateUsIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                {translations.rate_us}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileContainer}
              onPress={() => {
                navigation.navigate("Terms");
              }}
            >
              <View style={styles.iconBg}>
                <CustomIcon Icon={ICONS.policyIcon} height={16} width={16} />
              </View>
              <CustomText fontSize={14} fontFamily="regular">
                {translations.terms_conditions}
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
                {translations.privacy_policy}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12}>
            {translations.signOut}
          </CustomText>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={handleLogOut}
          >
            <View style={styles.iconBg}>
              <CustomIcon Icon={ICONS.supportIcon} height={16} width={16} />
            </View>
            <CustomText fontSize={14} fontFamily="regular">
              {translations.log_out}
            </CustomText>
          </TouchableOpacity>
        </View>

        <RateUs
          isVisible={isModalVisible}
          closeModal={() => setModalVisible(false)}
        />
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
    borderRadius: hp(14.5) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.green,
    overflow: "hidden",
  },
  userImg: {
    height: hp(13.5), // Now 1 unit smaller than outer
    width: hp(13.5),
    borderRadius: hp(13.5) / 2,
    resizeMode: "cover",
    // backgroundColor: "red",
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

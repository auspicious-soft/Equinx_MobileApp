import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { ProfileScreenProps } from "../../Typings/route";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  isIOS,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import CircularProgress from "../../Components/CircularProgress";
import IMAGES from "../../Assets/Images";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import Toast from "react-native-toast-message";
import { ProfileResponse, RecentFast } from "../../Typings/apiResponse";
import ENDPOINTS from "../../APIService/endPoints";
import { fetchData } from "../../APIService/api";
import { setProfileData } from "../../Redux/slices/ProfileSlice";
import { useLanguage } from "../../Context/LanguageContext";

const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { translations } = useLanguage();
  const { nutrition } = useAppSelector((state) => state.nutrition);
  const { settingData } = useAppSelector((state) => state.settingData);
  const { profileData } = useAppSelector((state) => state.profileData);
  const [isLoading, setIsLoading] = useState(false);

  const getBmiCatgeory = () => {
    if (profileData?.bmi < 18.5) {
      return translations.underWeight;
    } else if (profileData?.bmi >= 18.5 && profileData?.bmi < 25) {
      return translations.normal;
    } else if (profileData?.bmi >= 25 && profileData?.bmi < 30) {
      return translations.overWeight;
    } else {
      return translations.obese;
    }
  };

  const getProfileData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<ProfileResponse>(ENDPOINTS.myProfile);
      console.log("get profile data ", response);
      if (response.data.success) {
        dispatch(setProfileData(response.data.data));
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month},\n${year}`;
  };

  const formatTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("en-US", { month: "long" });
    return `Today, ${month} ${day}`;
  };

  const renderFastsData = ({ item }: { item: RecentFast }) => {
    return (
      <TouchableOpacity
        style={styles.fastsContainer}
        onPress={() => {
          if (item.date) {
            navigation.navigate("FastDetails", {
              date: item.date,
            });
          }
        }}
      >
        <View style={styles.dateContainer}>
          <CustomText
            fontSize={14}
            color={COLORS.green}
            fontFamily="bold"
            style={{ textAlign: "center" }}
          >
            {formatDate(item.date)}
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontFamily="medium" color={COLORS.darkBLue} fontSize={14}>
            {`${item.calories} ${translations.kcal} ${translations.consumed}`}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: horizontalScale(8),
            }}
          >
            <View>
              <CustomText
                fontFamily="regular"
                color={COLORS.green}
                fontSize={14}
              >
                {translations.view_details}
              </CustomText>
              <View style={{ height: 1, backgroundColor: COLORS.green }} />
            </View>
            <CustomIcon Icon={ICONS.rightGreenArrow} height={13} width={13} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        <View style={styles.nameContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.hello}{" "}
            <CustomText fontSize={22} fontFamily="bold" color={COLORS.green}>
              {settingData?.editProfile.fullName}
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.progressContainer}>
          <CustomText
            fontSize={16}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            {formatTodayDate()}
          </CustomText>
          <CircularProgress
            color={COLORS.green}
            backgroundColor={COLORS.white}
            progress={
              Math.min(
                nutrition?.todayMeal?.stats?.overall?.percentage! / 100,
                1
              ) || 0
            }
            radius={30}
            strokeWidth={20}
            progressStrokeWidth={8}
          >
            <CustomText fontSize={10} color={COLORS.darkBLue}>
              {`${Math.min(
                nutrition?.todayMeal?.stats?.overall?.percentage || 0,
                100
              )}%`}
            </CustomText>
          </CircularProgress>
        </View>

        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.my_progress}
          </CustomText>
          <View style={{ gap: verticalScale(8) }}>
            <View style={styles.alignContainer}>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.total_fast}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {profileData?.totalFasts}
                </CustomText>
              </View>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.last_7_fasts}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {`${profileData?.averageLast7Fasts}h`}
                </CustomText>
              </View>
            </View>
            <View style={styles.alignContainer}>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.longest_fast}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {`${profileData?.longestFast}h`}
                </CustomText>
              </View>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.longest_streak}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {`${profileData?.longestStreak}`}
                </CustomText>
              </View>
            </View>
            <View style={styles.alignContainer}>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.current_streak}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {`${profileData?.currentStreak}`}
                </CustomText>
              </View>
              <View style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.weight}
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  {`${profileData?.weight} lbs`}
                </CustomText>
              </View>
            </View>
            <View style={styles.horizontalContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomText
                  fontSize={12}
                  color={COLORS.darkBLue}
                  fontFamily="regular"
                >
                  {translations.body_mass}
                </CustomText>
                <View
                  style={[
                    styles.textContainer,
                    {
                      backgroundColor:
                        getBmiCatgeory() === "Underweight"
                          ? "#78C1E5"
                          : getBmiCatgeory() === "Normal Weight"
                          ? COLORS.greenBg
                          : getBmiCatgeory() === "Overweight"
                          ? COLORS.golden
                          : "#E57373", // for Obese
                    },
                  ]}
                >
                  <CustomText
                    fontSize={12}
                    fontFamily="medium"
                    color={COLORS.darkBLue}
                  >
                    {getBmiCatgeory()}
                  </CustomText>
                </View>
              </View>
              <CustomText fontSize={18} fontFamily="bold" color={COLORS.green}>
                {`${profileData?.bmi} kg`}
              </CustomText>
            </View>
          </View>
        </View>
        {isIOS && (
          <View style={styles.appleContainer}>
            <Image source={IMAGES.appleHealth} style={styles.appleImg} />
            <View style={{ gap: verticalScale(8) }}>
              <CustomText
                fontSize={14}
                fontFamily="medium"
                color={COLORS.darkBLue}
              >
                {translations.connect_to_apple}
              </CustomText>
              <TouchableOpacity style={styles.arrowContainer}>
                <View>
                  <CustomText
                    fontSize={14}
                    fontFamily="regular"
                    color={COLORS.green}
                  >
                    {translations.connect_now}
                  </CustomText>
                  <View style={{ height: 1, backgroundColor: COLORS.green }} />
                </View>
                <CustomIcon
                  Icon={ICONS.rightGreenArrow}
                  height={13}
                  width={13}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {profileData?.recentFasts && (
          <View style={{ gap: verticalScale(5) }}>
            <View style={styles.recentFastContainer}>
              <CustomText
                fontSize={18}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {translations.recent_fasts}
              </CustomText>
              {profileData.recentFasts.length > 5 && (
                <TouchableOpacity style={styles.filterContainer}>
                  <CustomIcon Icon={ICONS.filterIcon} height={12} width={12} />
                  <CustomText
                    fontSize={12}
                    color={COLORS.slateGrey}
                    fontFamily="regular"
                  >
                    {translations.filter_date}
                  </CustomText>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={profileData?.recentFasts}
              renderItem={renderFastsData}
              keyExtractor={(index) => index + " " + index}
              contentContainerStyle={{
                gap: verticalScale(10),
              }}
            />
          </View>
        )}

        {profileData?.recentFasts.length > 5 && (
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => {}}>
            <CustomText fontSize={14} fontFamily="regular" color={COLORS.green}>
              {translations.view_more}
            </CustomText>
            <View style={{ height: 1, backgroundColor: COLORS.green }} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    justifyContent: "space-between",
    borderRadius: 15,
  },
  detailWrapper: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    gap: verticalScale(15),
    width: wp(43.6),
    borderRadius: 10,
  },
  alignContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  horizontalContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    gap: verticalScale(15),
  },
  textContainer: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 6,
  },
  appleContainer: {
    backgroundColor: COLORS.greyishWhite,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  appleImg: {
    width: wp(20),
    height: hp(10),
    resizeMode: "contain",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  dateContainer: {
    backgroundColor: "#F0F8F0",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 10,
  },
  fastsContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 10,
    gap: horizontalScale(10),
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: horizontalScale(5),
  },
  recentFastContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

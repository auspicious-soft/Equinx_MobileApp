import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { HomeScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";
import CircularProgress from "../../Components/CircularProgress";
import PrimaryButton from "../../Components/PrimaryButton";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import WaterTrackModal from "../../Components/Modals/WaterTrackModal";
import RecordIntakeModal from "../../Components/Modals/RecordIntakeModal";
import moment from "moment-timezone";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import {
  HomeDataResponse,
  NutritionResponse,
  SettingResponse,
} from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import Toast from "react-native-toast-message";
import { setHomeData } from "../../Redux/slices/homeDataSlice";
import { useLanguage } from "../../Context/LanguageContext";
import { setNutrition } from "../../Redux/slices/NutritionSlice";
import { setSettingData } from "../../Redux/slices/settingSlice";
import AchivementModal from "../../Components/Modals/AchivementModal";

interface FastingMethod {
  type: "16:8" | "5:2";
  fastingDays?: number[]; // For 5:2, e.g., [1, 4] for Monday and Thursday (0 = Sunday)
}
const Home: FC<HomeScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();
  const dispatch = useAppDispatch();
  const { homeData } = useAppSelector((state) => state.homeData);
  const { settingData } = useAppSelector((state) => state.settingData);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [progress, setProgress] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isFasting, setIsFasting] = useState(false);
  const [recordModal, setRecordModal] = useState(false);
  const [achievementModal, setAchievementModal] = useState(false);

  const [fastingStatus, setFastingStatus] = useState<
    "Fasting" | "Eating" | "Low-Calorie"
  >("Eating");
  let diff: number;

  const [isLoading, setIsLoading] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // Record Intake Modal
  const [selectedRecord, setSelectedRecord] = useState<string | number>(250);

  // Water INtake Modal
  const [selectedConatinerValue, setSelectedContainerValue] = useState<
    string | number
  >(250);
  const [selectedDailyGoal, setSelectedDailyGoal] = useState<string | number>(
    3600
  );
  const [selectedContainer, setSelectedContainer] = useState<
    "bottle" | "glass" | string
  >(homeData?.waterIntake.containerType || "bottle");

  // Assume this comes from onboarding, stored in state or context
  const [fastingMethod, setFastingMethod] = useState<FastingMethod>({
    type: "16:8", // or "5:2"
    fastingDays: [1, 4], // For 5:2, Monday and Thursday
  });

  const closeModal = () => setIsModal(false);
  const closeRecordModal = () => setRecordModal(false);

  const getHomeData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<HomeDataResponse>(ENDPOINTS.home);
      console.log(response);

      if (response.data.success) {
        dispatch(setHomeData(response.data.data));
        setSelectedContainer(response.data.data.waterIntake.containerType);
        setSelectedContainerValue(response.data.data.waterIntake.containerSize);
        setSelectedDailyGoal(response.data.data.waterIntake.goal);
        setIsToggled(response.data.data.waterIntake.waterReminder);
        if (response.data.data.thisWeekFastingDays === 5) {
          setAchievementModal(true);
        } else {
          setAchievementModal(false);
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

  const handleFastingToday = async () => {
    setIsButtonLoading(true);
    try {
      const response = await postData(ENDPOINTS.fastingToday);
      console.log(response, "fasting record ");
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        getHomeData();
      }
    } catch (error: any) {
      Toast.show({
        type: "success",
        text1: "Fasting record already exists for today",
      });
    } finally {
      setIsButtonLoading(false);
    }
  };

  const handleGetNutrition = async () => {
    try {
      const response = await fetchData<NutritionResponse>(ENDPOINTS.nutrition);
      if (response.data.success) {
        dispatch(setNutrition(response.data.data));
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<SettingResponse>(ENDPOINTS.settings);
      // console.log("userData response", response);
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

  useEffect(() => {
    const updateTimer = () => {
      const now = moment().tz(moment.tz.guess());

      let totalDuration: number;

      if (fastingMethod.type === "16:8") {
        const eatingWindowStart = moment()
          .tz(moment.tz.guess())
          .set({ hour: 12, minute: 0, second: 0 });
        const fastingWindowStart = moment()
          .tz(moment.tz.guess())
          .set({ hour: 20, minute: 0, second: 0 });

        if (now.isBetween(eatingWindowStart, fastingWindowStart, null, "[)")) {
          // Eating window
          setIsFasting(false);
          setFastingStatus("Eating");
          diff = fastingWindowStart.diff(now);
          totalDuration = moment.duration(8, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        } else {
          // Fasting window
          setIsFasting(true);
          setFastingStatus("Fasting");
          let nextEatingWindow = eatingWindowStart.clone();
          if (now.isSameOrAfter(fastingWindowStart)) {
            nextEatingWindow.add(1, "day");
          }
          diff = nextEatingWindow.diff(now);
          totalDuration = moment.duration(16, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        }
      } else if (fastingMethod.type === "5:2") {
        const currentDay = now.day(); // 0 = Sunday, 1 = Monday, etc.
        const isFastingDay = fastingMethod.fastingDays?.includes(currentDay);

        if (isFastingDay) {
          // Fasting (low-calorie) day
          setIsFasting(true);
          setFastingStatus("Low-Calorie");
          const endOfDay = moment().tz(moment.tz.guess()).endOf("day");
          diff = endOfDay.diff(now);
          totalDuration = moment.duration(24, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        } else {
          // Regular eating day
          setIsFasting(false);
          setFastingStatus("Eating");
          const nextFastingDay = moment()
            .tz(moment.tz.guess())
            .day(
              fastingMethod.fastingDays![0] < currentDay
                ? fastingMethod.fastingDays![1]
                : fastingMethod.fastingDays![0]
            )
            .startOf("day");
          if (nextFastingDay.isBefore(now)) {
            nextFastingDay.add(7, "days");
          }
          diff = nextFastingDay.diff(now);
          totalDuration = moment
            .duration(
              nextFastingDay.diff(moment().tz(moment.tz.guess()).startOf("day"))
            )
            .asMilliseconds();
          setProgress(1 - diff / totalDuration);
        }
      }

      const duration = moment.duration(diff);
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");
      setTimeRemaining(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(intervalId);
  }, [fastingMethod]);

  useEffect(() => {
    getHomeData();
    handleGetNutrition();
    fetchUser();
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
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.headerContainer}>
          <CustomText fontSize={22} color={COLORS.darkBLue} fontFamily="bold">
            {translations.good_morning}{" "}
            <CustomText fontSize={22} color={COLORS.green} fontFamily="bold">
              {settingData?.editProfile.fullName}
            </CustomText>
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            {translations.ready_to_crush}
          </CustomText>
        </View>

        <View style={styles.topBox}>
          <View
            style={{
              gap: verticalScale(25),
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.fastingContainer,
                fastingMethod.type === "5:2" &&
                  fastingStatus === "Low-Calorie" && {
                    backgroundColor: COLORS.orange,
                  },
              ]}
            >
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {homeData?.fastingMethod} {translations.fasting_schedule}
              </CustomText>
              {fastingMethod.type === "5:2" &&
                fastingStatus === "Low-Calorie" && (
                  <CustomIcon Icon={ICONS.FastingIcon} height={16} width={16} />
                )}
            </View>
            <CircularProgress
              color={
                homeData?.fastingMethod === "16:8"
                  ? isFasting
                    ? COLORS.green
                    : COLORS.orange
                  : COLORS.green
              }
              backgroundColor={COLORS.white}
              progress={progress}
              radius={140}
              strokeWidth={30}
              backgroundStrokeWidth={22}
              progressStrokeWidth={30}
            >
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {fastingStatus} {translations.time_remaining}
              </CustomText>
              <CustomText
                fontSize={28}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {timeRemaining}
              </CustomText>
            </CircularProgress>
            <PrimaryButton
              title={`${translations.start_Your} ${homeData?.fastingMethod} ${
                homeData?.fastingMethod === "16:8"
                  ? isFasting
                    ? translations.fasting
                    : translations.eating
                  : translations.fasting
              }`}
              onPress={handleFastingToday}
              isLoading={isButtonLoading}
              style={{
                width: wp(80),
              }}
            />
          </View>
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <View style={styles.penContainer}>
            <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
              {translations.water_tracker}
            </CustomText>
            <TouchableOpacity
              style={styles.penBtn}
              onPress={() => setIsModal(true)}
            >
              <CustomIcon Icon={ICONS.penIcon} height={13} width={13} />
            </TouchableOpacity>
          </View>

          <View style={styles.waterTarckerInsideWrapper}>
            <CustomText
              fontSize={18}
              color={COLORS.green}
              style={{ textAlign: "center" }}
              fontFamily="bold"
            >
              {Number(homeData?.waterIntake.today) / 1000} {translations.Liters}{" "}
              <CustomText
                fontSize={18}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {translations.today}
              </CustomText>
            </CustomText>
            <View style={styles.dailyGoalContainer}>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {translations.daily_goal}
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.green}
                fontFamily="regular"
              >
                {homeData?.waterIntake.goal} {translations.liters}
              </CustomText>
            </View>
            <PrimaryButton
              title={translations.record_intake}
              onPress={() => setRecordModal(true)}
              style={{ width: wp(75) }}
            />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <CustomText fontSize={18} color={COLORS.darkBLue} fontFamily="bold">
            {translations.quick_stats}
          </CustomText>
          <View style={styles.statsWrapper}>
            <View style={styles.statsInsideCards}>
              <View
                style={{
                  gap: verticalScale(8),
                  paddingHorizontal: horizontalScale(5),
                }}
              >
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  {translations.you_have_fasted}
                </CustomText>
                <CustomText fontSize={18} color={COLORS.green}>
                  {`${homeData?.thisWeekFastingDays} ${translations.days}`}
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  {translations.in_a_row}
                </CustomText>
              </View>
              <Image
                source={IMAGES.homeImage}
                style={{
                  height: 90,
                  width: 100,
                  resizeMode: "cover",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
            <View style={styles.statsInsideCards}>
              <View
                style={{
                  gap: verticalScale(8),
                  paddingHorizontal: horizontalScale(5),
                }}
              >
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  {translations.total_hours_fasted}
                </CustomText>
                <CustomText fontSize={18} color={COLORS.green}>
                  {`${homeData?.thisWeekFastingHours} ${translations.hours}`}
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  {translations.this_week}
                </CustomText>
              </View>
              <Image
                source={IMAGES.homeImag2}
                style={{
                  height: 90,
                  width: 90,
                  resizeMode: "cover",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ gap: verticalScale(10) }}>
          <ImageBackground
            source={IMAGES.yogaHomeImage}
            style={{
              height: hp(30),
              width: wp(90),
              paddingBottom: verticalScale(20),
              paddingHorizontal: horizontalScale(15),
              gap: verticalScale(10),
              justifyContent: "flex-end",
            }}
            resizeMode="cover"
            borderRadius={12}
          >
            <CustomText fontSize={14} color={COLORS.white} fontFamily="bold">
              {translations.need_guidance}
            </CustomText>
            <CustomText fontSize={12} color={COLORS.white} fontFamily="regular">
              {translations.get_personlized_tips}
            </CustomText>
          </ImageBackground>
          <PrimaryButton
            title={translations.start_chat}
            onPress={() => {
              navigation.navigate("chats");
              // setAchievementModal(true);
            }}
          />
        </View>
        <WaterTrackModal
          closeModal={closeModal}
          isVisible={isModal}
          selectedConatinerValue={selectedConatinerValue}
          setSelectedContainerValue={setSelectedContainerValue}
          selectedDailyGoal={selectedDailyGoal}
          setSelectedDailyGoal={setSelectedDailyGoal}
          selectedContainer={selectedContainer}
          setSelectedContainer={setSelectedContainer}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          getHomeData={getHomeData}
        />
        <RecordIntakeModal
          closeModal={closeRecordModal}
          isVisible={recordModal}
          selectedRecord={selectedRecord}
          setSelectedRecord={setSelectedRecord}
          getHomeData={getHomeData}
        />
        <AchivementModal
          closeModal={() => setAchievementModal(false)}
          isVisible={achievementModal}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },

  headerContainer: {
    gap: verticalScale(10),
  },
  topBox: {
    backgroundColor: COLORS.greyishWhite,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
  },
  fastingContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: verticalScale(10),
    alignItems: "center",
    paddingHorizontal: horizontalScale(15),
    flexDirection: "row",
    gap: horizontalScale(5),
  },
  penBtn: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20,
  },
  penContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  waterTarckerInsideWrapper: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 12,
    gap: verticalScale(10),
  },
  dailyGoalContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20,
    paddingVertical: verticalScale(10),
  },
  statsInsideCards: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: verticalScale(15),
    flexDirection: "row",
    width: wp(44),
    borderRadius: 15,
    paddingHorizontal: horizontalScale(10),
    overflow: "hidden",
  },
  statsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
});

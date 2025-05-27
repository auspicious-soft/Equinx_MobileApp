import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, version } from "react";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomText } from "../../Components/CustomText";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CircularProgress from "../../Components/CircularProgress";
import LinearProgressBar from "../../Components/LinearProgressBar";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import PrimaryButton from "../../Components/PrimaryButton";
import MacroBalanceModal from "../../Components/Modals/MacroBalanceModal";
import RecordMealModal from "../../Components/Modals/RecordMealModal";
import AchivementModal from "../../Components/Modals/AchivementModal";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import { NutritionResponse } from "../../Typings/apiResponse";
import ENDPOINTS from "../../APIService/endPoints";
import { setNutrition } from "../../Redux/slices/NutritionSlice";

// const mealData = [
//   {
//     title: "Breakfast",
//     kcal: "311",
//     inProgress: "Completed",
//     mealImg: IMAGES.breakFastImg,
//   },
//   {
//     title: "Lunch",
//     kcal: "311",
//     inProgress: "pending",
//     mealImg: IMAGES.snackImg,
//   },
//   {
//     title: "Dinner",
//     kcal: "Recommended 311",
//     inProgress: "pending",
//     mealImg: IMAGES.captureMealImg,
//   },
//   {
//     title: "Other",
//     kcal: "",
//     inProgress: "",
//     mealImg: IMAGES.dinnerImg,
//   },
// ];

const Nutrition = () => {
  const [isMacroModal, setIsMacroModal] = useState(false);
  const [recordMealModal, setRecordMealModal] = useState(false);
  const [achievementModal, setAchievementModal] = useState(false);
  const dispatch = useAppDispatch();
  const [mealType, setMealType] = useState<string | null>(null);
  const [mealId, setMealId] = useState<string | null>(null);
  const [carbs, setCarbs] = useState("");
  const [protine, setProtine] = useState("");
  const [fat, setFat] = useState("");
  const [status, setStatus] = useState(false);

  const { nutrition } = useAppSelector((state) => state.nutrition);

  const closeAchivementModal = () => {
    setAchievementModal(false);
  };

  const closeRecordMealModal = () => {
    setRecordMealModal(false);
  };

  const closeMacroModal = () => {
    setIsMacroModal(false);
  };

  const handleGetNutrition = async () => {
    try {
      const response = await fetchData<NutritionResponse>(ENDPOINTS.nutrition);
      console.log("nutrition response", response);
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

  useEffect(() => {
    handleGetNutrition();
  }, []);

  // Helper function to calculate progress ratio with a cap at 1.0 (100%)
  const calculateProgress = (consumed: number, target: number): number => {
    return Math.min(consumed / target, 1) || 0;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "fff4e5" }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.header}>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            Track Your Nutrition
          </CustomText>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.darkBLue}
          >
            Log your meals and track your daily nutrition intake.
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(20) }}>
          <View style={styles.progressWrapper}>
            <View style={styles.greenProgressContainer}>
              <CircularProgress
                color={COLORS.green}
                backgroundColor={COLORS.greyishWhite}
                progress={
                  Math.min(
                    nutrition?.todayMeal.stats.overall.percentage! / 100,
                    1
                  ) || 0
                }
                radius={50}
                strokeWidth={20}
                backgroundStrokeWidth={8}
                progressStrokeWidth={12}
              >
                <CustomText
                  fontSize={13}
                  color={COLORS.darkBLue}
                  fontFamily="medium"
                >
                  {`${Math.min(
                    nutrition?.todayMeal.stats.overall.percentage || 0,
                    100
                  )}%`}
                </CustomText>
              </CircularProgress>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                Consumed
              </CustomText>
            </View>
            <View style={{ flex: 1, gap: verticalScale(12) }}>
              <View style={{ gap: verticalScale(5) }}>
                <View style={styles.titleAligns}>
                  <CustomText
                    fontFamily="regular"
                    fontSize={12}
                    color={COLORS.darkBLue}
                  >
                    Fats
                  </CustomText>
                  <CustomText
                    fontFamily="regular"
                    fontSize={10}
                    color={COLORS.darkBLue}
                  >
                    {nutrition?.todayMeal.stats.fat.consumed} {"/"}
                    {nutrition?.todayMeal.stats.fat.target}g
                  </CustomText>
                </View>
                <LinearProgressBar
                  progress={
                    nutrition?.todayMeal.stats.fat.consumed! /
                      nutrition?.todayMeal.stats.fat.target! || 0
                  }
                  height={14}
                  borderRadius={6}
                  backgroundColor="white"
                  progressColor={COLORS.slateGrey}
                />
              </View>
              <View style={{ gap: verticalScale(5) }}>
                <View style={styles.titleAligns}>
                  <CustomText
                    fontFamily="regular"
                    fontSize={12}
                    color={COLORS.darkBLue}
                  >
                    Carbs
                  </CustomText>
                  <CustomText
                    fontFamily="regular"
                    fontSize={10}
                    color={COLORS.darkBLue}
                  >
                    {nutrition?.todayMeal.stats.carbs.consumed} {"/"}
                    {nutrition?.todayMeal.stats.carbs.target}g
                  </CustomText>
                </View>
                <LinearProgressBar
                  progress={
                    nutrition?.todayMeal.stats.carbs.consumed! /
                      nutrition?.todayMeal.stats.carbs.target! || 0
                  }
                  height={14}
                  borderRadius={6}
                  backgroundColor="white"
                  progressColor={COLORS.slateGrey}
                />
              </View>
              <View style={{ gap: verticalScale(5) }}>
                <View style={styles.titleAligns}>
                  <CustomText
                    fontFamily="regular"
                    fontSize={12}
                    color={COLORS.darkBLue}
                  >
                    Protien
                  </CustomText>
                  <CustomText
                    fontFamily="regular"
                    fontSize={10}
                    color={COLORS.darkBLue}
                  >
                    {nutrition?.todayMeal.stats.protein.consumed} {"/"}
                    {nutrition?.todayMeal.stats.protein.target}g
                  </CustomText>
                </View>
                <LinearProgressBar
                  progress={
                    nutrition?.todayMeal.stats.protein.consumed! /
                      nutrition?.todayMeal.stats.protein.target! || 0
                  }
                  height={14}
                  borderRadius={6}
                  backgroundColor="white"
                  progressColor={COLORS.slateGrey}
                />
              </View>
            </View>
          </View>
          <View style={styles.remainingContainer}>
            <CustomText
              fontFamily="medium"
              fontSize={14}
              color={COLORS.darkBLue}
            >
              Great! You are almost there!
            </CustomText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomText
                color={COLORS.darkBLue}
                fontFamily="regular"
                fontSize={12}
              >
                Remaining Calories
              </CustomText>
              <CustomText color={COLORS.green} fontFamily="bold" fontSize={12}>
                540 kcal
              </CustomText>
            </View>
          </View>
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <CustomText fontSize={16} fontFamily="bold" color={COLORS.darkBLue}>
            Log Your Meals
          </CustomText>

          <View style={styles.mealCard}>
            <Image source={IMAGES.breakFastImg} style={styles.mealImgStyle} />
            <View style={{ flex: 1, gap: verticalScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={14}
                  fontFamily="medium"
                  color={COLORS.darkBLue}
                >
                  Breakfast
                </CustomText>
                <TouchableOpacity
                  style={styles.penContainer}
                  onPress={() => {
                    setMealType("Breakfast");
                    setMealId(nutrition?.todayMeal._id);
                    setCarbs(
                      nutrition?.todayMeal.firstMealStatus.carbs.toString()
                    );
                    setFat(nutrition?.todayMeal.firstMealStatus.fat.toString());
                    setProtine(
                      nutrition?.todayMeal.firstMealStatus.protein.toString()
                    );
                    setStatus(nutrition?.todayMeal.firstMealStatus.status);
                    setRecordMealModal(true);
                  }}
                >
                  <CustomIcon
                    Icon={ICONS.whitePenIcon}
                    height={14}
                    width={14}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal.firstMealStatus.calories && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal.firstMealStatus.calories} Kcal`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal.firstMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal.firstMealStatus.status === true
                    ? "Completed"
                    : "Pending"}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.mealCard}>
            <Image source={IMAGES.breakFastImg} style={styles.mealImgStyle} />
            <View style={{ flex: 1, gap: verticalScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={14}
                  fontFamily="medium"
                  color={COLORS.darkBLue}
                >
                  Lunch
                </CustomText>
                <TouchableOpacity
                  style={styles.penContainer}
                  onPress={() => {
                    setMealType("Lunch");
                    setMealId(nutrition?.todayMeal._id);
                    setCarbs(
                      nutrition?.todayMeal.secondMealStatus.carbs.toString()
                    );
                    setFat(
                      nutrition?.todayMeal.secondMealStatus.fat.toString()
                    );
                    setProtine(
                      nutrition?.todayMeal.secondMealStatus.protein.toString()
                    );
                    setStatus(nutrition?.todayMeal.secondMealStatus.status);

                    setRecordMealModal(true);
                  }}
                >
                  <CustomIcon
                    Icon={ICONS.whitePenIcon}
                    height={14}
                    width={14}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal.secondMealStatus.calories && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal.secondMealStatus.calories} Kcal`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal.secondMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal.secondMealStatus.status === true
                    ? "Completed"
                    : "Pending"}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.mealCard}>
            <Image source={IMAGES.breakFastImg} style={styles.mealImgStyle} />
            <View style={{ flex: 1, gap: verticalScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={14}
                  fontFamily="medium"
                  color={COLORS.darkBLue}
                >
                  Dinner
                </CustomText>
                <TouchableOpacity
                  style={styles.penContainer}
                  onPress={() => {
                    setMealType("Dinner");
                    setMealId(nutrition?.todayMeal._id);
                    setCarbs(
                      nutrition?.todayMeal.thirdMealStatus.carbs.toString()
                    );
                    setFat(nutrition?.todayMeal.thirdMealStatus.fat.toString());
                    setProtine(
                      nutrition?.todayMeal.thirdMealStatus.protein.toString()
                    );
                    setStatus(nutrition?.todayMeal.thirdMealStatus.status);

                    setRecordMealModal(true);
                  }}
                >
                  <CustomIcon
                    Icon={ICONS.whitePenIcon}
                    height={14}
                    width={14}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal.thirdMealStatus.calories && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal.thirdMealStatus.calories} Kcal`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal.thirdMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal.thirdMealStatus.status === true
                    ? "Completed"
                    : "Pending"}
                </CustomText>
              </View>
            </View>
          </View>
          <View style={styles.mealCard}>
            <Image source={IMAGES.breakFastImg} style={styles.mealImgStyle} />
            <View style={{ flex: 1, gap: verticalScale(10) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={14}
                  fontFamily="medium"
                  color={COLORS.darkBLue}
                >
                  Other
                </CustomText>
                <TouchableOpacity
                  style={styles.penContainer}
                  onPress={() => {
                    setMealType("Other");
                    setMealId(nutrition?.todayMeal._id);
                    setCarbs(
                      nutrition?.todayMeal.otherMealStatus.carbs.toString()
                    );
                    setFat(nutrition?.todayMeal.otherMealStatus.fat.toString());
                    setProtine(
                      nutrition?.todayMeal.otherMealStatus.protein.toString()
                    );
                    setStatus(nutrition?.todayMeal.otherMealStatus.status);

                    setRecordMealModal(true);
                  }}
                >
                  <CustomIcon
                    Icon={ICONS.whitePenIcon}
                    height={14}
                    width={14}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal.thirdMealStatus.calories && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal.thirdMealStatus.calories} Kcal`}</CustomText>
                  </View>
                )}
                {nutrition?.todayMeal.otherMealStatus && (
                  <CustomText
                    fontFamily="medium"
                    fontSize={10}
                    color={
                      nutrition?.todayMeal.otherMealStatus.status === true
                        ? COLORS.green
                        : COLORS.darkBLue
                    }
                  >
                    {nutrition?.todayMeal.otherMealStatus.status === true
                      ? "Completed"
                      : "Pending"}
                  </CustomText>
                )}
              </View>
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
              Need Help Regarding Your Nutrition?
            </CustomText>
            <CustomText fontSize={12} color={COLORS.white} fontFamily="regular">
              Get personalized tips, motivation, and fasting insights from our
              AI coach.
            </CustomText>
          </ImageBackground>
          <PrimaryButton
            title="Start Chat"
            onPress={() => setAchievementModal(true)}
          />
        </View>

        <View style={{ gap: verticalScale(15) }}>
          <View style={{ gap: verticalScale(5) }}>
            <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
              Recalculate Kcal Intake
            </CustomText>
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              Your daily intake is based on your age, gender, and activity
              level.
            </CustomText>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: horizontalScale(5),
            }}
          >
            <View>
              <CustomText
                fontSize={14}
                color={COLORS.green}
                fontFamily="regular"
              >
                Recalculate Kcal Intake
              </CustomText>
              <View
                style={{
                  height: 0.9,
                  backgroundColor: COLORS.green,
                }}
              />
            </View>
            <CustomIcon Icon={ICONS.rightGreenArrow} height={15} width={15} />
          </TouchableOpacity>
        </View>

        <View style={{ gap: verticalScale(8) }}>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
              Macro balance
            </CustomText>
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              Track your macros and optimize your daily nutrition for better
              results.
            </CustomText>
          </View>
          <ImageBackground
            source={IMAGES.macroMealImg}
            style={{
              height: hp(31),
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
              Unlock Macrobalance
            </CustomText>
            <CustomText fontSize={12} color={COLORS.white} fontFamily="regular">
              Upgrade to plus member to fine tune all your macronutrients needs.
            </CustomText>
          </ImageBackground>
          <PrimaryButton
            title="Upgrade"
            onPress={() => {
              setIsMacroModal(true);
            }}
          />
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
              Capture Your Meal
            </CustomText>
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              Tailor your experience with Equin Global Plus
            </CustomText>
          </View>
          <ImageBackground
            source={IMAGES.coverMealImg}
            style={{
              height: hp(31),
              width: wp(90),
            }}
            resizeMode="cover"
            borderRadius={12}
          ></ImageBackground>
          <PrimaryButton title="Capture Meal" onPress={() => {}} />
        </View>
        <MacroBalanceModal
          closeModal={closeMacroModal}
          isVisible={isMacroModal}
        />
        <RecordMealModal
          isVisible={recordMealModal}
          closeModal={closeRecordMealModal}
          mealType={mealType}
          mealId={mealId}
          getNutrition={handleGetNutrition}
          Mealcarbs={carbs}
          Mealfat={fat}
          Mealprotine={protine}
          status={status}
        />

        <AchivementModal
          closeModal={closeAchivementModal}
          isVisible={achievementModal}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Nutrition;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    gap: verticalScale(25),
    backgroundColor: "fff4e5",
  },
  header: {
    gap: verticalScale(5),
  },
  greenProgressContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    alignItems: "center",
    gap: verticalScale(5),
    paddingHorizontal: horizontalScale(18),
    paddingVertical: verticalScale(8),
  },
  progressWrapper: {
    flexDirection: "row",
    gap: horizontalScale(15),
    alignItems: "center",
    // backgroundColor: "red",
  },
  titleAligns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remainingContainer: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 10,
    backgroundColor: "#EFFFF3",
    gap: verticalScale(12),
  },
  mealImgStyle: {
    height: hp(10),
    width: wp(23),
    resizeMode: "contain",
    borderRadius: 8,
  },
  mealCard: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    gap: horizontalScale(10),
  },
  kcalContainer: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 8,
  },
  penContainer: {
    backgroundColor: COLORS.slateGrey,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 20,
  },
});

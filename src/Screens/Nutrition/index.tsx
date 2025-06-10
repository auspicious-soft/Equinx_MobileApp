import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import LinearProgressBar from "../../Components/LinearProgressBar";
import AchivementModal from "../../Components/Modals/AchivementModal";
import RecordMealModal from "../../Components/Modals/RecordMealModal";
import PrimaryButton from "../../Components/PrimaryButton";
import { setNutrition } from "../../Redux/slices/NutritionSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { NutritionResponse } from "../../Typings/apiResponse";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CircularProgress from "../../Components/CircularProgress";
import { NutritionScreenProps } from "../../Typings/route";
import { useLanguage } from "../../Context/LanguageContext";

const noData = [
  // "--",
  // "--",
  // "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
  "--",
];

const Nutrition: FC<NutritionScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { nutrition } = useAppSelector((state) => state.nutrition);
  const { translations } = useLanguage();

  const microNutrients = [
    // "carbs",
    // "protein",
    // "fat",
    translations.fiber,
    translations.sugar,
    translations.sodium,
    translations.potassium,
    translations.calcium,
    translations.iron,
    translations.vitaminA,
    translations.vitaminC,
    translations.vitaminD,
    translations.vitaminE,
    translations.vitaminK,
    translations.vitaminB1,
    translations.vitaminB2,
    translations.vitaminB3,
  ];

  const [recordMealModal, setRecordMealModal] = useState(false);
  const [captureMealModal, setCaptureMealModal] = useState(false);
  const [mealType, setMealType] = useState<string | null>(null);
  const [mealId, setMealId] = useState<string | null>(null);
  const [carbs, setCarbs] = useState("");
  const [protine, setProtine] = useState("");
  const [fat, setFat] = useState("");
  const [status, setStatus] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [breakfastItemsToShow, setBreakfastItemsToShow] = useState(4);
  const [lunchItemsToShow, setLunchItemsToShow] = useState(4);
  const [dinnerItemsToShow, setDinnerItemsToShow] = useState(4);
  const [otherItemsToShow, setOtherItemsToShow] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const [refreshData, setRefreshData] = useState(0);

  const getRemainingCaloriesStatus = () => {
    const totalCalories =
      nutrition?.todayMeal?.stats?.carbs?.target +
      nutrition?.todayMeal?.stats?.protein?.target +
      nutrition?.todayMeal?.stats?.fat?.target;

    const consumedCalories =
      nutrition?.todayMeal?.stats?.carbs?.consumed +
      nutrition?.todayMeal?.stats?.protein?.consumed +
      nutrition?.todayMeal?.stats?.fat?.consumed;

    const remaining = totalCalories - consumedCalories;

    if (remaining > 800) {
      return {
        message: translations.need_more_fuel,
        backgroundColor: "#EFFFF3",
        borderColor: COLORS.golden,
        textColor: COLORS.golden,
      };
    } else if (remaining > 0) {
      return {
        message: translations.Great_you_almost,
        backgroundColor: "#E3F2FD",
        borderColor: "#64B5F6",
        textColor: "#64B5F6",
      };
    } else if (remaining === 0) {
      return {
        message: translations.perfect_sufficient_calories,
        backgroundColor: "#E8F5E9",
        borderColor: "#66BB6A",
        textColor: "#66BB6A",
      };
    } else {
      return {
        message: translations.be_careful_more_calories,
        backgroundColor: "#FFEBEE",
        borderColor: "#E57373",
        textColor: "#E57373",
      };
    }
  };

  const { message, backgroundColor, borderColor, textColor } =
    getRemainingCaloriesStatus();

  const closeRecordMealModal = () => {
    setRecordMealModal(false);
  };

  const closeCaptureMealModal = () => {
    setCaptureMealModal(false);
  };

  const handleGetNutrition = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetNutrition();
  }, [refreshData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.green} size={30} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "fff4e5" }}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* Header */}

        <View style={styles.header}>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.track_your_nurtition}
          </CustomText>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.darkBLue}
          >
            {translations.lof_your_meals_track}
          </CustomText>
        </View>

        {/* Progress Bars */}

        {nutrition?.todayMeal.planId !== null ? (
          <View style={{ gap: verticalScale(20) }}>
            <View style={styles.progressWrapper}>
              <View style={styles.greenProgressContainer}>
                <CircularProgress
                  color={COLORS.green}
                  backgroundColor={COLORS.greyishWhite}
                  progress={
                    Math.min(
                      nutrition?.todayMeal?.stats?.overall?.percentage! / 100,
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
                      nutrition?.todayMeal?.stats?.overall?.percentage || 0,
                      100
                    )}%`}
                  </CustomText>
                </CircularProgress>
                <CustomText
                  fontSize={12}
                  color={COLORS.darkBLue}
                  fontFamily="regular"
                >
                  {translations.consumed}
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
                      {translations.Fats}
                    </CustomText>
                    <CustomText
                      fontFamily="regular"
                      fontSize={10}
                      color={COLORS.darkBLue}
                    >
                      {nutrition?.todayMeal?.stats?.fat.consumed} {"/"}
                      {nutrition?.todayMeal?.stats?.fat.target}g
                    </CustomText>
                  </View>
                  <LinearProgressBar
                    progress={
                      nutrition?.todayMeal?.stats?.fat.consumed! /
                        nutrition?.todayMeal?.stats?.fat.target! || 0
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
                      {translations.Carbs}
                    </CustomText>
                    <CustomText
                      fontFamily="regular"
                      fontSize={10}
                      color={COLORS.darkBLue}
                    >
                      {nutrition?.todayMeal?.stats?.carbs.consumed} {"/"}
                      {nutrition?.todayMeal?.stats?.carbs.target}g
                    </CustomText>
                  </View>
                  <LinearProgressBar
                    progress={
                      nutrition?.todayMeal?.stats?.carbs.consumed! /
                        nutrition?.todayMeal?.stats?.carbs.target! || 0
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
                      {translations.Protein}
                    </CustomText>
                    <CustomText
                      fontFamily="regular"
                      fontSize={10}
                      color={COLORS.darkBLue}
                    >
                      {nutrition?.todayMeal?.stats?.protein.consumed} {"/"}
                      {nutrition?.todayMeal?.stats?.protein.target}g
                    </CustomText>
                  </View>
                  <LinearProgressBar
                    progress={
                      nutrition?.todayMeal?.stats?.protein.consumed! /
                        nutrition?.todayMeal?.stats?.protein.target! || 0
                    }
                    height={14}
                    borderRadius={6}
                    backgroundColor="white"
                    progressColor={COLORS.slateGrey}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.remainingContainer,
                {
                  backgroundColor: backgroundColor,
                  borderColor: borderColor,
                },
              ]}
            >
              <CustomText
                fontFamily="medium"
                fontSize={14}
                color={COLORS.darkBLue}
              >
                {message}
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
                  {translations.Remaining_Calories}
                </CustomText>
                <CustomText color={textColor} fontFamily="bold" fontSize={12}>
                  {`${Math.abs(
                    nutrition?.todayMeal?.stats?.carbs?.target +
                      nutrition?.todayMeal?.stats?.protein?.target +
                      nutrition?.todayMeal?.stats?.fat?.target -
                      (nutrition?.todayMeal?.stats?.carbs?.consumed +
                        nutrition?.todayMeal?.stats?.protein?.consumed +
                        nutrition?.todayMeal?.stats?.fat?.consumed)
                  )} ${translations.kcal}`}
                </CustomText>
              </View>
            </View>
          </View>
        ) : (
          <ImageBackground
            source={IMAGES.blurImg}
            style={styles.blurImg}
            resizeMode="cover"
            borderRadius={25}
          >
            <View style={styles.blurContainer}>
              <PrimaryButton
                title={translations.upgrade_your_plan}
                onPress={() => {
                  navigation.navigate("MemberShip");
                }}
                isFullWidth={false}
                style={styles.blurBtn}
              />
            </View>
          </ImageBackground>
        )}
        {/* Log Your Meals */}
        <View style={{ gap: verticalScale(10) }}>
          <CustomText fontSize={16} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.log_your_meal}
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
                {nutrition?.todayMeal.firstMealStatus.status === false && (
                  <TouchableOpacity
                    style={styles.penContainer}
                    onPress={() => {
                      setMealType("Breakfast");
                      setMealId(nutrition?.todayMeal?._id!);
                      setCarbs(
                        nutrition?.todayMeal?.firstMealStatus.carbs.toString()!
                      );
                      setFat(
                        nutrition?.todayMeal?.firstMealStatus.fat.toString()!
                      );
                      setProtine(
                        nutrition?.todayMeal?.firstMealStatus.protein.toString()!
                      );
                      setStatus(nutrition?.todayMeal?.firstMealStatus.status!);
                      setRecordMealModal(true);
                    }}
                  >
                    <CustomIcon
                      Icon={ICONS.whitePenIcon}
                      height={14}
                      width={14}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal?.firstMealStatus.calories !==
                  undefined && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal?.firstMealStatus?.calories} ${translations.kcal}`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal?.firstMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal?.firstMealStatus.status === true
                    ? `${translations.completed}`
                    : `${translations.pending}`}
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

                {nutrition?.todayMeal.secondMealStatus.status === false && (
                  <TouchableOpacity
                    style={styles.penContainer}
                    onPress={() => {
                      setMealType("Lunch");
                      setMealId(nutrition?.todayMeal?._id!);
                      setCarbs(
                        nutrition?.todayMeal?.secondMealStatus.carbs.toString()!
                      );
                      setFat(
                        nutrition?.todayMeal?.secondMealStatus.fat.toString()!
                      );
                      setProtine(
                        nutrition?.todayMeal?.secondMealStatus.protein.toString()!
                      );
                      setStatus(nutrition?.todayMeal?.secondMealStatus.status!);

                      setRecordMealModal(true);
                    }}
                  >
                    <CustomIcon
                      Icon={ICONS.whitePenIcon}
                      height={14}
                      width={14}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal?.secondMealStatus?.calories !==
                  undefined && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal?.secondMealStatus?.calories} ${translations.kcal}`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal?.secondMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal?.secondMealStatus.status === true
                    ? `${translations.completed}`
                    : `${translations.pending}`}
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
                {nutrition?.todayMeal.thirdMealStatus.status === false && (
                  <TouchableOpacity
                    style={styles.penContainer}
                    onPress={() => {
                      setMealType("Dinner");
                      setMealId(nutrition?.todayMeal?._id!);
                      setCarbs(
                        nutrition?.todayMeal?.thirdMealStatus.carbs.toString()!
                      );
                      setFat(
                        nutrition?.todayMeal?.thirdMealStatus.fat.toString()!
                      );
                      setProtine(
                        nutrition?.todayMeal?.thirdMealStatus.protein.toString()!
                      );
                      setStatus(nutrition?.todayMeal?.thirdMealStatus.status!);

                      setRecordMealModal(true);
                    }}
                  >
                    <CustomIcon
                      Icon={ICONS.whitePenIcon}
                      height={14}
                      width={14}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal?.thirdMealStatus?.calories !==
                  undefined && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal?.thirdMealStatus?.calories} ${translations.kcal}`}</CustomText>
                  </View>
                )}
                <CustomText
                  fontFamily="medium"
                  fontSize={10}
                  color={
                    nutrition?.todayMeal?.thirdMealStatus.status === true
                      ? COLORS.green
                      : COLORS.darkBLue
                  }
                >
                  {nutrition?.todayMeal?.thirdMealStatus.status === true
                    ? `${translations.completed}`
                    : `${translations.pending}`}
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
                {nutrition?.todayMeal.otherMealStatus.status === false && (
                  <TouchableOpacity
                    style={styles.penContainer}
                    onPress={() => {
                      setMealType("Other");
                      setMealId(nutrition?.todayMeal?._id!);
                      setCarbs(
                        nutrition?.todayMeal?.otherMealStatus.carbs.toString()!
                      );
                      setFat(
                        nutrition?.todayMeal?.otherMealStatus.fat.toString()!
                      );
                      setProtine(
                        nutrition?.todayMeal?.otherMealStatus.protein.toString()!
                      );
                      setStatus(nutrition?.todayMeal?.otherMealStatus.status!);

                      setRecordMealModal(true);
                    }}
                  >
                    <CustomIcon
                      Icon={ICONS.whitePenIcon}
                      height={14}
                      width={14}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                {nutrition?.todayMeal?.otherMealStatus.calories !==
                  undefined && (
                  <View style={styles.kcalContainer}>
                    <CustomText
                      fontSize={12}
                      color={COLORS.green}
                      fontFamily="medium"
                    >{`${nutrition.todayMeal?.otherMealStatus.calories} ${translations.kcal}`}</CustomText>
                  </View>
                )}
                {nutrition?.todayMeal?.otherMealStatus.status === true && (
                  <CustomText
                    fontFamily="medium"
                    fontSize={10}
                    color={
                      nutrition?.todayMeal?.otherMealStatus.status === true
                        ? COLORS.green
                        : COLORS.darkBLue
                    }
                  >
                    {nutrition?.todayMeal?.otherMealStatus.status === true
                      ? `${translations.completed}`
                      : `${translations.pending}`}
                  </CustomText>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Chat with AI */}

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
              {translations.need_help_nutrition}
            </CustomText>
            <CustomText fontSize={12} color={COLORS.white} fontFamily="regular">
              {translations.get_personlized_tips}
            </CustomText>
          </ImageBackground>
          <PrimaryButton
            title={translations.start_chat}
            onPress={() => {
              navigation.navigate("chats");
            }}
          />
        </View>

        {/* Macro Balance */}

        {nutrition?.todayMeal.planId === null ? (
          <View style={{ gap: verticalScale(8) }}>
            <View style={{ gap: verticalScale(6) }}>
              <CustomText
                fontSize={18}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                {translations.macro_balance}
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {translations.track_your_macros}
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
                {translations.unlock_macros}
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.white}
                fontFamily="regular"
              >
                {translations.upgrade_macronutrients_need}
              </CustomText>
            </ImageBackground>
            <PrimaryButton
              title={translations.upgrade}
              onPress={() => {
                navigation.navigate("MemberShip");
              }}
            />
          </View>
        ) : (
          <View style={styles.modalContent}>
            <View
              style={{
                paddingHorizontal: horizontalScale(20),
                paddingTop: verticalScale(15),
                gap: verticalScale(10),
              }}
            >
              <View style={{ gap: verticalScale(8) }}>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.darkBLue}
                >
                  {translations.macro_balance}
                </CustomText>
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.track_your_macros}
                </CustomText>
              </View>

              <View style={styles.percentageContainer}>
                <CustomText
                  fontSize={26}
                  fontFamily="bold"
                  color={COLORS.green}
                  style={{ textAlign: "center" }}
                >
                  {`${Math.min(
                    nutrition?.todayMeal?.stats?.overall?.percentage || 0,
                    100
                  )}%`}
                </CustomText>
                <CustomText
                  fontSize={10}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                  style={{ textAlign: "center" }}
                >
                  {translations.great_job}
                </CustomText>
              </View>

              <View style={styles.macroKcalContainer}>
                <CustomText
                  fontFamily="regular"
                  fontSize={12}
                  color={COLORS.darkBLue}
                >
                  {translations.daily_intake_required}
                </CustomText>
                <CustomText
                  fontFamily="bold"
                  fontSize={12}
                  color={COLORS.green}
                >
                  {nutrition?.todayMeal.planId.total_calories}
                </CustomText>
              </View>
              {/* <PrimaryButton
                title={translations.Recalculated}
                onPress={() => {
                  navigation.navigate("Recalculate");
                }}
              /> */}
            </View>

            <View
              style={{
                backgroundColor: COLORS.white,
                paddingHorizontal: horizontalScale(20),
                paddingTop: verticalScale(15),
                paddingBottom: verticalScale(10),
              }}
            >
              <View style={{ gap: verticalScale(5) }}>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.darkBLue}
                >
                  {translations.breakdown_macronutrients}
                </CustomText>
                <View style={styles.seeMoreContainer}>
                  <CustomText fontSize={14} color={COLORS.darkBLue}>
                    {translations.breakfast}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSeeMore(!isSeeMore);
                      setBreakfastItemsToShow(
                        breakfastItemsToShow === 4 ? microNutrients.length : 4
                      );
                    }}
                  >
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.green}
                    >
                      {breakfastItemsToShow === 4
                        ? translations.see_more
                        : translations.see_less}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={styles.breakdownContainer}>
                  <View style={{ gap: verticalScale(5) }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      {translations.macronutrient}
                    </CustomText>

                    {microNutrients
                      .slice(0, breakfastItemsToShow)
                      .map((item, index) => (
                        <CustomText
                          fontSize={14}
                          fontFamily="medium"
                          color={COLORS.darkBLue}
                          key={index}
                        >
                          {item}
                        </CustomText>
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: horizontalScale(20),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ gap: verticalScale(5), alignItems: "center" }}
                    >
                      <CustomText
                        fontSize={12}
                        fontFamily="medium"
                        color={COLORS.slateGrey}
                      >
                        {translations.consumed}
                      </CustomText>

                      {nutrition?.todayMeal.firstMealStatus.microNutrients
                        ? Object.entries(
                            nutrition?.todayMeal.firstMealStatus.microNutrients
                          )
                            .slice(0, breakfastItemsToShow)
                            .map(([key, value], index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                                key={index}
                              >
                                {value}g
                              </CustomText>
                            ))
                        : noData
                            .slice(0, breakfastItemsToShow)
                            .map((item, index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.slateGrey}
                                key={index}
                              >
                                {item}
                              </CustomText>
                            ))}
                    </View>
                  </View>
                </View>
                <View style={styles.seeMoreContainer}>
                  <CustomText fontSize={14} color={COLORS.darkBLue}>
                    {translations.lunch}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSeeMore(!isSeeMore);
                      setLunchItemsToShow(
                        lunchItemsToShow === 4 ? microNutrients.length : 4
                      );
                    }}
                  >
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.green}
                    >
                      {lunchItemsToShow === 4
                        ? translations.see_more
                        : translations.see_less}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={styles.breakdownContainer}>
                  <View style={{ gap: verticalScale(5) }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      {translations.macronutrient}
                    </CustomText>
                    {microNutrients
                      .slice(0, lunchItemsToShow)
                      .map((item, index) => (
                        <CustomText
                          fontSize={14}
                          fontFamily="medium"
                          color={COLORS.darkBLue}
                          key={index}
                        >
                          {item}
                        </CustomText>
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: horizontalScale(20),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ gap: verticalScale(5), alignItems: "center" }}
                    >
                      <CustomText
                        fontSize={12}
                        fontFamily="medium"
                        color={COLORS.slateGrey}
                      >
                        {translations.consumed}
                      </CustomText>
                      {nutrition?.todayMeal.secondMealStatus.microNutrients
                        ? Object.entries(
                            nutrition?.todayMeal.secondMealStatus.microNutrients
                          )
                            .slice(0, lunchItemsToShow)
                            .map(([key, value], index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                                key={index}
                              >
                                {value}g
                              </CustomText>
                            ))
                        : noData
                            .slice(0, lunchItemsToShow)
                            .map((item, index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.slateGrey}
                                key={index}
                              >
                                {item}
                              </CustomText>
                            ))}
                    </View>
                  </View>
                </View>
                <View style={styles.seeMoreContainer}>
                  <CustomText fontSize={14} color={COLORS.darkBLue}>
                    {translations.dinner}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSeeMore(!isSeeMore);
                      setDinnerItemsToShow(
                        dinnerItemsToShow === 4 ? microNutrients.length : 4
                      );
                    }}
                  >
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.green}
                    >
                      {dinnerItemsToShow === 4
                        ? translations.see_more
                        : translations.see_less}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={styles.breakdownContainer}>
                  <View style={{ gap: verticalScale(5) }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      {translations.macronutrient}
                    </CustomText>
                    {microNutrients
                      .slice(0, dinnerItemsToShow)
                      .map((item, index) => (
                        <CustomText
                          fontSize={14}
                          fontFamily="medium"
                          color={COLORS.darkBLue}
                          key={index}
                        >
                          {item}
                        </CustomText>
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: horizontalScale(20),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ gap: verticalScale(5), alignItems: "center" }}
                    >
                      <CustomText
                        fontSize={12}
                        fontFamily="medium"
                        color={COLORS.slateGrey}
                      >
                        {translations.consumed}
                      </CustomText>
                      {nutrition?.todayMeal.thirdMealStatus.microNutrients
                        ? Object.entries(
                            nutrition?.todayMeal.thirdMealStatus.microNutrients
                          )
                            .slice(0, dinnerItemsToShow)
                            .map(([key, value], index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                                key={index}
                              >
                                {value}g
                              </CustomText>
                            ))
                        : noData
                            .slice(0, dinnerItemsToShow)
                            .map((item, index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.slateGrey}
                                key={index}
                              >
                                {item}
                              </CustomText>
                            ))}
                    </View>
                  </View>
                </View>
                <View style={styles.seeMoreContainer}>
                  <CustomText fontSize={14} color={COLORS.darkBLue}>
                    {translations.other}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSeeMore(!isSeeMore);
                      setOtherItemsToShow(
                        otherItemsToShow === 4 ? microNutrients.length : 4
                      );
                    }}
                  >
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.green}
                    >
                      {otherItemsToShow === 4
                        ? translations.see_more
                        : translations.see_less}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                <View style={styles.breakdownContainer}>
                  <View style={{ gap: verticalScale(5) }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      {translations.macronutrient}
                    </CustomText>
                    {microNutrients
                      .slice(0, otherItemsToShow)
                      .map((item, index) => (
                        <CustomText
                          fontSize={14}
                          fontFamily="medium"
                          color={COLORS.darkBLue}
                          key={index}
                        >
                          {item}
                        </CustomText>
                      ))}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: horizontalScale(20),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ gap: verticalScale(5), alignItems: "center" }}
                    >
                      <CustomText
                        fontSize={12}
                        fontFamily="medium"
                        color={COLORS.slateGrey}
                      >
                        {translations.consumed}
                      </CustomText>
                      {nutrition?.todayMeal.otherMealStatus.microNutrients
                        ? Object.entries(
                            nutrition?.todayMeal.otherMealStatus.microNutrients
                          )
                            .slice(0, otherItemsToShow)
                            .map(([key, value], index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                                key={index}
                              >
                                {value}g
                              </CustomText>
                            ))
                        : noData
                            .slice(0, otherItemsToShow)
                            .map((item, index) => (
                              <CustomText
                                fontSize={14}
                                fontFamily="medium"
                                color={COLORS.slateGrey}
                                key={index}
                              >
                                {item}
                              </CustomText>
                            ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Capture Your Meal */}

        {nutrition?.todayMeal.planId && (
          <View style={{ gap: verticalScale(10) }}>
            <View style={{ gap: verticalScale(6) }}>
              <CustomText
                fontSize={18}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                {translations.capture_your_meal}
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {translations.tailor_experience}
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
            <PrimaryButton
              title={translations.Capture_meal}
              onPress={() => {
                setMealType("breakfast");
                setCaptureMealModal(true);
              }}
            />
          </View>
        )}

        {/* Modals */}

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
          isPlanActive={!!nutrition?.todayMeal.planId} // Pass plan status
          refreshData={() => {
            setRefreshData(Math.floor(Math.random() * 1000));
          }}
        />

        {nutrition?.todayMeal.planId && (
          <RecordMealModal
            isVisible={captureMealModal}
            closeModal={closeCaptureMealModal}
            mealType={mealType}
            mealId={mealId}
            getNutrition={handleGetNutrition}
            initialTab="catpureMeal"
            isPlanActive={true} // This modal only shows when plan exists
            refreshData={() => {
              setRefreshData(Math.floor(Math.random() * 1000));
            }}
          />
        )}
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
  blurImg: {
    height: hp(26.7),
    width: wp(91.7),
    borderRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.white,
    gap: verticalScale(15),
    borderRadius: 28,
    overflow: "hidden",
    paddingBottom: verticalScale(20),
    // borderWidth: 2,
    // borderColor: COLORS.green,
  },
  percentageContainer: {
    backgroundColor: COLORS.greyishWhite,
    alignItems: "center",
    borderRadius: 10,
    paddingTop: verticalScale(5),
    gap: verticalScale(5),
    paddingBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
  },
  breakdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.greyishWhite,
    borderWidth: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  macroKcalContainer: {
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(8),
  },
  seeMoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blurContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  blurBtn: {
    width: wp(50),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});

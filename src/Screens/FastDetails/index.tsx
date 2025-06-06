import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FastDetailsScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { FastsDataResponse, Meal } from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setFastsData } from "../../Redux/slices/DateMeal";
import FastsMealModal from "../../Components/Modals/FastsMealModal";
import { useLanguage } from "../../Context/LanguageContext";

// const mealData = [
//   {
//     title: "Breakfast",
//     kcal: "311",
//     inProgress: "Completed",
//     mealImg: IMAGES.breakFastImg,
//   },
//   {
//     title: "Lunch",
//     kcal: "Required 311",
//     inProgress: "Not Recorded",
//     mealImg: IMAGES.snackImg,
//   },
//   {
//     title: "Dinner",
//     kcal: "311",
//     inProgress: "pending",
//     mealImg: IMAGES.captureMealImg,
//   },

// ];

const FastDetail: FC<FastDetailsScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const { translations } = useLanguage();
  const { fastsData } = useAppSelector((state) => state.fastsData);
  const { date } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getFastsData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<FastsDataResponse>(
        `${ENDPOINTS.getMealByDate}?date=${date}`
      );
      console.log("getFastsData response -->", response);

      if (response.data.success) {
        dispatch(setFastsData(response.data.data));
      }
    } catch (error: any) {
      console.log("fast detail error", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWaterStatus = (consumed: number, goal: number) => {
    const ratio = consumed / goal;

    if (ratio < 0.5) {
      return {
        message: translations.need_more_water,
        textColor: COLORS.golden,
        bgColor: "#EFFFF3",
        Color: COLORS.golden,
      };
    } else if (ratio >= 0.5 && ratio < 1) {
      return {
        message: translations.keep_good_Work,
        textColor: "#89B7E3",
        bgColor: "#EFFAFF",
        Color: "#78C1E5",
      };
    } else {
      return {
        message: translations.perfect_consumed_water,
        textColor: COLORS.green,
        bgColor: "#F0F8F0",
        Color: COLORS.green,
      };
    }
  };

  useEffect(() => {
    getFastsData();
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
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
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
            {formatDate(date)}
          </CustomText>
        </View>

        <View style={{ gap: verticalScale(15) }}>
          <CustomText fontSize={16} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.yourMeals}
          </CustomText>

          {fastsData?.meal?.planId?.meals ? (
            fastsData.meal.planId.meals.map((item: any, index: number) => {
              const IMG = [
                IMAGES.breakFastImg,
                IMAGES.snackImg,
                IMAGES.dinnerImg,
              ];
              const title = ["Breakfast", "Lunch", "Dinner"];
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.mealCard}
                  onPress={() => {
                    const mealWithType = { ...item, meal_type: title[index] };
                    setSelectedMeal(mealWithType);
                    setIsModal(true);
                  }}
                >
                  <Image source={IMG[index]} style={styles.mealImgStyle} />
                  <View style={{ flex: 1, gap: verticalScale(10) }}>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      {title[index]}
                    </CustomText>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.calories && (
                        <View style={styles.kcalContainer}>
                          <CustomText
                            fontSize={12}
                            color={COLORS.green}
                            fontFamily="medium"
                          >{`${item.calories} `}</CustomText>
                        </View>
                      )}

                      {item.mealStatus.status == true ? (
                        <CustomText
                          fontFamily="medium"
                          fontSize={10}
                          color={COLORS.green}
                        >
                          {translations.completed}
                        </CustomText>
                      ) : (
                        <CustomText
                          fontFamily="medium"
                          fontSize={10}
                          color={COLORS.darkBLue}
                        >
                          {translations.pending}
                        </CustomText>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.noMealsContainer}>
              <CustomText
                fontSize={14}
                fontFamily="medium"
                color={COLORS.darkBLue}
              >
                Buy a plan to see your recorded Meals
              </CustomText>
            </View>
          )}
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.water_intake}
          </CustomText>
          {fastsData?.waterIntake &&
            (() => {
              const { consumed, goal } = fastsData.waterIntake;
              const consumedLitres = (consumed / 1000).toFixed(1); // convert ml to litres
              const goalLitres = (goal / 1000).toFixed(1);
              const { message, textColor, bgColor, Color } = getWaterStatus(
                consumed,
                goal
              );

              return (
                <View
                  style={[
                    styles.footerContainer,
                    { backgroundColor: bgColor, borderColor: Color },
                  ]}
                >
                  <View
                    style={{
                      gap: verticalScale(5),
                      paddingVertical: verticalScale(5),
                    }}
                  >
                    <CustomText
                      fontSize={18}
                      fontFamily="bold"
                      color={textColor}
                    >
                      {consumedLitres} {translations.Liters}
                    </CustomText>
                    <CustomText
                      fontSize={12}
                      fontFamily="regular"
                      color={COLORS.darkBLue}
                    >
                      {message}
                    </CustomText>
                  </View>
                  <View style={styles.goalContainer}>
                    <CustomText
                      fontSize={12}
                      fontFamily="regular"
                      color={COLORS.darkBLue}
                    >
                      {translations.goal}
                    </CustomText>
                    <CustomText
                      fontSize={12}
                      fontFamily="regular"
                      color={COLORS.green}
                    >
                      {goalLitres} {translations.Liters}
                    </CustomText>
                  </View>
                </View>
              );
            })()}
        </View>

        <FastsMealModal
          isVisible={isModal}
          closeModal={() => setIsModal(false)}
          onpress={() => {}}
          data={selectedMeal}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default FastDetail;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  mealCard: {
    backgroundColor: COLORS.greyishWhite,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    gap: horizontalScale(10),
  },
  kcalContainer: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 8,
  },
  mealImgStyle: {
    height: hp(10),
    width: wp(23),
    resizeMode: "contain",
    borderRadius: 10,
  },
  footerContainer: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 10,
    backgroundColor: "#EFFFF3",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    gap: verticalScale(10),
  },
  goalContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: COLORS.white,
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(10),
    justifyContent: "space-between",
    borderRadius: 20,
  },
  noMealsContainer: {
    padding: verticalScale(15),
    backgroundColor: COLORS.greyishWhite,
    borderRadius: 10,
    alignItems: "center",
  },
});

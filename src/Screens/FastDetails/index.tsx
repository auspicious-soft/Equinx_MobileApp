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
import { FastsDataResponse } from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setFastsData } from "../../Redux/slices/DateMeal";

const mealData = [
  {
    title: "Breakfast",
    kcal: "311",
    inProgress: "Completed",
    mealImg: IMAGES.breakFastImg,
  },
  {
    title: "Lunch",
    kcal: "Required 311",
    inProgress: "Not Recorded",
    mealImg: IMAGES.snackImg,
  },
  {
    title: "Dinner",
    kcal: "311",
    inProgress: "pending",
    mealImg: IMAGES.captureMealImg,
  },
  {
    title: "Snack",
    kcal: "311",
    inProgress: "",
    mealImg: IMAGES.fastMealImg,
  },
];

const FastDetail: FC<FastDetailsScreenProps> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { fastsData } = useAppSelector((state) => state.fastsData);
  const { date } = route.params;
  const [isLoading, setIsLoading] = useState(false);

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
        ENDPOINTS.getMealByDate
      );
      console.log("date response -->", response);

      if (response.data.success) {
        dispatch(setFastsData(response.data.data));
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
    if (date) {
      getFastsData();
    }
  }, [date]);

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
            Your Meals
          </CustomText>

          {mealData.map((item, index) => (
            <View key={index} style={styles.mealCard}>
              <Image source={item.mealImg} style={styles.mealImgStyle} />
              <View style={{ flex: 1, gap: verticalScale(10) }}>
                <CustomText
                  fontSize={14}
                  fontFamily="medium"
                  color={COLORS.darkBLue}
                >
                  {item.title}
                </CustomText>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  {item.kcal && (
                    <View style={styles.kcalContainer}>
                      <CustomText
                        fontSize={12}
                        color={COLORS.green}
                        fontFamily="medium"
                      >{`${item.kcal} Kcal`}</CustomText>
                    </View>
                  )}
                  <CustomText
                    fontFamily="medium"
                    fontSize={10}
                    color={
                      item.inProgress === "Completed"
                        ? COLORS.green
                        : COLORS.darkBLue
                    }
                  >
                    {item.inProgress}
                  </CustomText>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
            Water Intake
          </CustomText>
          <View style={styles.footerContainer}>
            <View
              style={{
                gap: verticalScale(5),
                paddingVertical: verticalScale(5),
              }}
            >
              <CustomText fontSize={18} fontFamily="bold" color={COLORS.green}>
                5.6 Liters
              </CustomText>
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                Perfect! You consumed a lot of water.
              </CustomText>
            </View>
            <View style={styles.goalContainer}>
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                Goal
              </CustomText>
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.green}
              >
                3.6 Liters
              </CustomText>
            </View>
          </View>
        </View>
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
});

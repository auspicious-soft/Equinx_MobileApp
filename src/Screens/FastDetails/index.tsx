import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
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

const FastDetail: FC<FastDetailsScreenProps> = ({ navigation }) => {
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
            23 March 2025
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
                    color={COLORS.green}
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
    backgroundColor: COLORS.lightGreenGradient.start,
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
    backgroundColor: COLORS.lightGreenGradient.start,
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

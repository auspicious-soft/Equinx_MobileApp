import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { MyPlanScreenProps } from "../../Typings/route";
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
import CircularProgress from "../../Components/CircularProgress";
import {
  DateData,
  DateDataType,
  foodData,
  FoodDataType,
  TipsData,
  TipsDataType,
} from "../../Seeds/MyPlanScreenData";
import MealModal from "../../Components/Modals/MealModal";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";

const MyPlan: FC<MyPlanScreenProps> = ({ navigation }) => {
  const [activeDay, setActiveDay] = useState<string | null>("1");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isPlan, setIsPlan] = useState<"plan" | "notPlan">("plan");

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const renderDates = ({ item }: { item: DateDataType }) => {
    const isActive = activeDay === item.day;

    return (
      <TouchableOpacity
        onPress={() => setActiveDay(item.day)}
        style={[
          styles.dayBtn,
          {
            backgroundColor: isActive ? COLORS.darkBLue : COLORS.greyishWhite,
          },
        ]}
      >
        <CustomText
          fontSize={14}
          color={isActive ? COLORS.white : COLORS.darkBLue}
        >
          {` Day ${item.day} `}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderFoodData = ({ item }: { item: FoodDataType }) => {
    return (
      <TouchableOpacity
        style={{ gap: verticalScale(5) }}
        activeOpacity={0.8}
        onPress={() => {
          setIsVisibleModal(true);
        }}
      >
        <CustomText
          fontSize={12}
          color={COLORS.lightGrey}
          fontFamily="semiBold"
        >
          {item.name}
        </CustomText>
        <View style={styles.foodWrapper}>
          <Image source={item.IMG} style={styles.foodIMG} />
          <View style={{ gap: verticalScale(10), flex: 1 }}>
            <CustomText fontSize={14} color={COLORS.darkBLue}>
              {item.title}
            </CustomText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingEnd: horizontalScale(10),
              }}
            >
              <View style={styles.KcalContainer}>
                <CustomText
                  fontSize={12}
                  color={COLORS.green}
                  fontFamily="medium"
                >{`${item.kcal} Kcal`}</CustomText>
              </View>
              <CustomText fontSize={10} color={COLORS.green}>
                {item.completed}
              </CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTipsData = ({ item }: { item: TipsDataType }) => {
    return (
      <View style={styles.tipsWrapper}>
        <Image source={item.IMG} style={styles.foodIMG} />
        <View
          style={{
            flex: 1,
            paddingVertical: verticalScale(3),
          }}
        >
          <CustomText
            fontSize={10}
            color={COLORS.lightGrey}
            style={{ marginBottom: verticalScale(8) }}
          >
            {item.date}
          </CustomText>

          <CustomText
            fontSize={14}
            style={{ flexWrap: "wrap" }}
            color={COLORS.darkBLue}
            fontFamily="medium"
          >
            {item.title}
          </CustomText>
          <CustomText fontSize={12} color={COLORS.lightGrey}>
            {item.shortDescription}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.main}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={IMAGES.myPlanImage}
            style={styles.mainImage}
            resizeMode="cover"
          >
            {" "}
            <TouchableOpacity
              onPress={() => {
                setIsPlan("plan");
              }}
            >
              <CustomText>pruchased</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsPlan("notPlan");
              }}
            >
              <CustomText>Not pruchased</CustomText>
            </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              flex: 1,
              paddingVertical: verticalScale(15),
              paddingHorizontal: horizontalScale(20),
              gap: verticalScale(15),
            }}
          >
            {isPlan === "plan" ? (
              <View
                style={{
                  gap: verticalScale(15),
                }}
              >
                <View
                  style={{
                    gap: verticalScale(15),
                  }}
                >
                  <View
                    style={{
                      gap: verticalScale(8),
                    }}
                  >
                    <CustomText
                      fontSize={22}
                      color={COLORS.darkBLue}
                      fontFamily="bold"
                    >
                      Stay on track{" "}
                      <CustomText
                        fontSize={22}
                        color={COLORS.green}
                        fontFamily="bold"
                      >
                        Miley Jones
                      </CustomText>
                    </CustomText>
                    <CustomText fontSize={12} color={COLORS.darkBLue}>
                      Here's your plan for today.
                    </CustomText>
                  </View>
                  <View style={styles.progressContainer}>
                    <CustomText fontSize={16} color={COLORS.lightGrey}>
                      Today, March 25
                    </CustomText>

                    <CircularProgress
                      color={COLORS.green}
                      backgroundColor={COLORS.white}
                      progress={0.7}
                      radius={30}
                      strokeWidth={20}
                      // backgroundStrokeWidth={15}
                      progressStrokeWidth={8}
                    >
                      <CustomText fontSize={10} color={COLORS.darkBLue}>
                        65%
                      </CustomText>
                    </CircularProgress>
                  </View>
                </View>
                <FlatList
                  renderItem={renderDates}
                  data={DateData}
                  keyExtractor={({ id }) => id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: horizontalScale(5),
                  }}
                />
                <FlatList
                  renderItem={renderFoodData}
                  data={foodData}
                  keyExtractor={({ id }) => id.toString()}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: verticalScale(15),
                  }}
                />
              </View>
            ) : (
              <View
                style={{
                  gap: verticalScale(15),
                }}
              >
                <View
                  style={{
                    gap: verticalScale(8),
                  }}
                >
                  <CustomText
                    fontSize={22}
                    color={COLORS.darkBLue}
                    fontFamily="bold"
                  >
                    Buy a plan to stay on track
                  </CustomText>
                  <CustomText fontSize={12} color={COLORS.darkBLue}>
                    Check out a membership plan that suits your needs.
                  </CustomText>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MemberShip");
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: verticalScale(8),
                  }}
                >
                  <View>
                    <CustomText fontSize={14} color={COLORS.green}>
                      View Plans
                    </CustomText>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: COLORS.green,
                      }}
                    />
                  </View>
                  <CustomIcon
                    Icon={ICONS.rightGreenArrow}
                    height={13}
                    width={13}
                  />
                </TouchableOpacity>
              </View>
            )}

            <View
              style={{ gap: verticalScale(10), marginTop: verticalScale(12) }}
            >
              <CustomText
                fontSize={18}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                Essential Tips for Success
              </CustomText>
              <FlatList
                renderItem={renderTipsData}
                data={TipsData}
                keyExtractor={({ id }) => id.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: verticalScale(8),
                }}
              />
            </View>
          </View>
          <MealModal
            closeModal={closeModal}
            isVisible={isVisibleModal}
            heading="Meal Plan"
            mealType="Breakfast"
            timing="12:00"
            kcal="500-600 kcal"
            title1="1 cup cooked gluten-free oats (50 g, low-fat milk)"
            title2="1 tbsp peanut butter"
            title3="1 small banana"
            onpress={() => {}}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default MyPlan;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainImage: {
    width: wp(100),
    height: hp(35),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    resizeMode: "cover",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 12,
  },
  dayBtn: {
    borderWidth: 0.9,
    borderColor: COLORS.greyishWhite,
    borderRadius: 12,
    // paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  foodIMG: {
    height: verticalScale(80),
    width: verticalScale(80),
    resizeMode: "cover",
    borderRadius: 10,
  },
  foodWrapper: {
    backgroundColor: COLORS.greyishWhite,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
  },
  KcalContainer: {
    backgroundColor: COLORS.lightGreenGradient.start,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 8,
  },
  tipsWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
    flexDirection: "row",
    gap: horizontalScale(10),
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    alignItems: "center",
  },
});

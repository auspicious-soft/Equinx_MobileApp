import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
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
import MealModal from "../../Components/Modals/MealModal";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import {
  EssentialTip,
  Meal,
  MyPlanApiResponse,
  MyPlanData,
  PlanId,
} from "../../Typings/apiResponse";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setMyPlan } from "../../Redux/slices/MyPlan";
import { useLanguage } from "../../Context/LanguageContext";

const MyPlan: FC<MyPlanScreenProps> = ({ navigation }) => {
  const { nutrition } = useAppSelector((state) => state.nutrition);
  const { translations } = useLanguage();
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const [activeDay, setActiveDay] = useState<string | null>("1");
  const [activeData, setActiveData] = useState<MyPlanData | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const dispatch = useAppDispatch();
  const { myPlan } = useAppSelector((state) => state.myPlan);
  const { settingData } = useAppSelector((state) => state.settingData);
  const [selectedMealData, setSelectedMealData] = useState<Meal | null>(null);
  const closeModal = () => {
    setIsVisibleModal(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const mealData = [
    {
      name: translations.breakfast,
      image: IMAGES.breakFastImg,
      title: translations.breakfast_intermittent,
    },
    {
      name: translations.lunch,
      image: IMAGES.snackImg,
      title: translations.lunch_intermittent,
    },
    {
      name: translations.dinner,
      image: IMAGES.dinnerImg,
      title: translations.dinner_intermittent,
    },
  ];

  const getMyPlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<MyPlanApiResponse>(ENDPOINTS.getMyPlan);
      console.log(response);
      if (response.data.success) {
        dispatch(setMyPlan(response.data.data));
        if (response.data.data.hasActivePlan) {
          setActiveDay(response.data.data.plan[2].planId._id);
        }
        setActiveData(response.data.data.plan[2]);
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

  const renderDates = ({ item }: { item: MyPlanData }) => {
    const isActive = activeDay === item.planId._id;

    return (
      <TouchableOpacity
        onPress={() => {
          setActiveDay(item.planId._id);
          setActiveData(item);
        }}
        style={[
          styles.dayBtn,
          {
            backgroundColor: isActive ? COLORS.darkBLue : COLORS.white,
          },
        ]}
      >
        <CustomText
          fontSize={14}
          color={isActive ? COLORS.white : COLORS.darkBLue}
        >
          {` ${translations.day} ${item.planId.day} `}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderFoodData = ({ item, index }: { item: any; index: number }) => {
    const calorie = activeData?.planId?.meals[index]?.calories;

    const firstMealStatus = activeData?.firstMealStatus?.status || false;
    const secondMealStatus = activeData?.secondMealStatus?.status || false;
    const thirdMealStatus = activeData?.thirdMealStatus?.status || false;

    const getStatus = [firstMealStatus, secondMealStatus, thirdMealStatus];

    const isMeal = ["Breakfast", "Lunch", "Dinner"];

    return (
      <TouchableOpacity
        style={{ gap: verticalScale(5) }}
        activeOpacity={0.8}
        onPress={() => {
          setSelectedMealData(activeData?.planId?.meals[index]!);
          setIsVisibleModal(true);
          setSelectedMeal(isMeal[index]);
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
          <Image source={item.image} style={styles.foodIMG} />
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
              {calorie && (
                <View style={styles.KcalContainer}>
                  <CustomText
                    fontSize={12}
                    color={COLORS.green}
                    fontFamily="medium"
                  >
                    {calorie}
                  </CustomText>
                </View>
              )}
              {getStatus[index] ? (
                <CustomText
                  fontSize={10}
                  color={
                    getStatus[index] === true ? COLORS.green : COLORS.darkBLue
                  }
                >
                  {translations.completed}
                </CustomText>
              ) : (
                <CustomText
                  fontSize={10}
                  color={
                    getStatus[index] === false ? COLORS.darkBLue : COLORS.green
                  }
                >
                  {translations.pending}
                </CustomText>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTipsData = ({
    item,
    index,
  }: {
    item: EssentialTip;
    index: any;
  }) => {
    const IMG = [IMAGES.benefitImg, IMAGES.fastingImg, IMAGES.exploringImg];
    return (
      <View style={styles.tipsWrapper}>
        <Image source={IMG[index]} style={styles.tipIMG} />
        <View
          style={{
            flex: 1,
            paddingVertical: verticalScale(5),
          }}
        >
          <CustomText
            fontSize={10}
            color={COLORS.lightGrey}
            style={{ marginBottom: verticalScale(8) }}
          >
            {new Date(item.publishDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              timeZone: "UTC",
            })}
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
            {item.description}
          </CustomText>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getMyPlan();
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
      style={{
        flex: 1,
        backgroundColor: "fff4e5",
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={IMAGES.myPlanImage}
          style={styles.mainImage}
          resizeMode="cover"
        ></ImageBackground>
        <View
          style={{
            flex: 1,
            paddingVertical: verticalScale(15),
            paddingHorizontal: horizontalScale(20),
            gap: verticalScale(15),
            backgroundColor: "fff4e5",
          }}
        >
          {myPlan?.hasActivePlan ? (
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
                    {translations.stay_on_track}{" "}
                    <CustomText
                      fontSize={22}
                      color={COLORS.green}
                      fontFamily="bold"
                    >
                      {settingData?.editProfile.fullName}
                    </CustomText>
                  </CustomText>
                  <CustomText fontSize={12} color={COLORS.darkBLue}>
                    {translations.plan_for_today}
                  </CustomText>
                </View>
                <View style={styles.progressContainer}>
                  <CustomText fontSize={16} color={COLORS.lightGrey}>
                    {translations.Today}, March 25
                  </CustomText>

                  <CircularProgress
                    color={COLORS.green}
                    backgroundColor={COLORS.greyishWhite}
                    progress={
                      Math.min(
                        nutrition?.todayMeal?.stats?.overall?.percentage! / 100,
                        1
                      ) || 0
                    }
                    radius={30}
                    strokeWidth={20}
                    // backgroundStrokeWidth={15}
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
              </View>
              <FlatList
                renderItem={renderDates}
                data={myPlan.plan}
                keyExtractor={({ _id }) => _id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: horizontalScale(5),
                }}
              />
              <FlatList
                data={mealData}
                renderItem={renderFoodData}
                keyExtractor={(item, index) => item.name + index.toString()}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  gap: verticalScale(15),
                }}
                scrollEnabled={false}
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
                  {translations.buy_plan}
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  {translations.checkout_member}
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
                  <CustomText fontSize={18} color={COLORS.green}>
                    {translations.viewPlan}
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
                  height={15}
                  width={15}
                />
              </TouchableOpacity>
            </View>
          )}

          <View
            style={{ gap: verticalScale(10), marginTop: verticalScale(12) }}
          >
            <CustomText fontSize={18} color={COLORS.darkBLue} fontFamily="bold">
              {translations.Essentials_tips}
            </CustomText>
            <FlatList
              renderItem={renderTipsData}
              data={myPlan?.essentialTips}
              keyExtractor={({ _id }) => _id.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: verticalScale(8),
              }}
            />
          </View>
        </View>
        {selectedMealData && (
          <MealModal
            closeModal={closeModal}
            isVisible={isVisibleModal}
            onpress={() => {}}
            data={selectedMealData}
            selectedMeal={selectedMeal}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default MyPlan;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "fff4e5",
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
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 12,
  },
  dayBtn: {
    borderWidth: 0.2,
    borderColor: COLORS.oldGrey,
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
    resizeMode: "contain",
    borderRadius: 10,
  },
  foodWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(8),
    flexDirection: "row",
    gap: horizontalScale(10),
    alignItems: "center",
  },
  KcalContainer: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(7),
    paddingHorizontal: horizontalScale(8),
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
  tipIMG: {
    height: verticalScale(80),
    width: verticalScale(80),
    resizeMode: "cover",
    borderRadius: 10,
  },
});

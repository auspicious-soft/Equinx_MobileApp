import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import PrimaryButton from "../../Components/PrimaryButton";
import { setPricePlan } from "../../Redux/slices/planPrices";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { PricePlan } from "../../Typings/apiResponse";
import { MemberShipScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";

const planData = [
  {
    id: "basic",
    title: "Basic",
    months: 3,
    price: 11.66,
    annualPriceEquivalent: 34.99,
    isBestPrice: false,
  },
  {
    id: "best",
    title: "Best price",
    months: 12,
    price: 6.66,
    annualPriceEquivalent: 79.99,
    isBestPrice: true,
  },
  {
    id: "popular",
    title: "Popular",
    months: 6,
    price: 6.66,
    annualPriceEquivalent: 49.99,
    isBestPrice: false,
  },
];

const basicFeatureList = ["Yes", "Yes", "Yes", "Limited", "Limited", "Limited"];

const cardData = [
  {
    id: "1",
    heading: "Capture Your Meal",
    title: "Tailor your experience with Equin Global Plus",
    IMG: IMAGES.captureMealImg,
    description:
      "Take a photo of your food to get a detailed analysis of the calories, fat, protein, and carbs on your plate.",
    name: "",
    subHeading: "",
  },
  {
    id: "2",
    heading: "See What People Say",
    title: "",
    IMG: IMAGES.peopleSayImg,
    description:
      "My customized fasting plan really helped me with my stomach cramps and bloating problems.",
    name: "Yasmin K.",
    subHeading: "Improved digestion",
  },
];

const MemberShip: FC<MemberShipScreenProps> = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { plansPrices } = useAppSelector((state) => state.planPrices);

  const getPricePlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<PricePlan[]>(ENDPOINTS.getPricePlan);
      console.log(response);

      if (response.data.success) {
        dispatch(setPricePlan(response.data.data));
        setSelectedPlanId(response.data.data[0]._id);
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

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const PlanCard = ({ plan }: { plan: PricePlan }) => {
    const isSelected = selectedPlanId === plan._id;

    return (
      <TouchableOpacity
        onPress={() => handleSelectPlan(plan._id)}
        style={{
          flex: 1,
          paddingHorizontal: verticalScale(10),
          paddingVertical: verticalScale(10),
          borderWidth: 1,
          borderColor: isSelected ? COLORS.green : "#F2F0F5",
          borderRadius: 10,
          alignItems: "center",
          gap: verticalScale(5),
          position: "relative",
        }}
      >
        <CustomText
          color={COLORS.green}
          fontFamily="semiBold"
          fontSize={18}
          style={{ textAlign: "center" }}
        >
          {plan.months}
          {"\n"}Months
        </CustomText>
        <CustomText
          color={COLORS.darkBLue}
          fontSize={14}
          style={{ textAlign: "center" }}
        >
          {`$${plan.price.toFixed(2)}/month`}
        </CustomText>
        <CustomText
          color={COLORS.lightGrey}
          fontSize={12}
          style={{ textAlign: "center" }}
        >
          {/* {`only $${plan.annualPriceEquivalent.toFixed(2)}  \n ${
            plan.months === 3
              ? "for 3 months"
              : plan.months === 6
              ? "for 6 months"
              : "annually"
          }`} */}
          {plan.description}
        </CustomText>
        <View
          style={{
            position: "absolute",
            top: "-10%", // Align the top of the badge with the top of the card
            backgroundColor: isSelected
              ? COLORS.darkGreenGradient.start
              : "#F2F0F5",
            paddingHorizontal:
              plan.type.length > 6 ? verticalScale(10) : verticalScale(20),
            paddingVertical: verticalScale(5),
            borderRadius: 30,
          }}
        >
          <CustomText
            fontFamily="medium"
            fontSize={10}
            color={isSelected ? COLORS.white : COLORS.darkBLue}
            style={{ textAlign: "center" }}
          >
            {/* {plan.title} */}
            {plan?.type}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getPricePlan();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.green} size={30} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
      style={styles.gradient}
      start={{ x: 0.3, y: 0 }} // Start from the top center
      end={{ x: 0.3, y: 1 }}
    >
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          // backgroundColor: COLORS.white,
        }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
            style={styles.backButton}
          >
            <CustomIcon Icon={ICONS.BackArrow} height={30} width={30} />
          </TouchableOpacity>
          <Image source={IMAGES.noteBookImg} style={styles.imgStyle} />
          <View
            style={{
              gap: verticalScale(30),
            }}
          >
            <View
              style={{
                // backgroundColor: "red",
                paddingHorizontal: horizontalScale(20),
                gap: verticalScale(10),
              }}
            >
              <CustomText
                fontSize={22}
                color={COLORS.darkBLue}
                fontFamily="bold"
                style={{ textAlign: "center" }}
              >
                Reach the healthiest version of you!
              </CustomText>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="regular"
                style={{ textAlign: "center" }}
              >
                Learn the science behind fasting and its benefits for your
                overall health.
              </CustomText>
            </View>

            <View
              style={{
                gap: verticalScale(15),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: verticalScale(20),
                }}
              >
                {plansPrices.map((plan, index) => (
                  <PlanCard key={plan._id} plan={plan} />
                ))}
              </View>
              <PrimaryButton title="Upgrade now" onPress={() => {}} />
            </View>

            <View>
              <View
                style={{
                  gap: verticalScale(10),
                  // paddingRight: horizontalScale(15),
                }}
              >
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.darkBLue}
                >
                  Perks of Having a Membership
                </CustomText>
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Customize your personal journey with Equin Global Plus
                </CustomText>

                <View
                  style={{
                    marginTop: verticalScale(20),
                    gap: verticalScale(10),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      gap: horizontalScale(40),
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: horizontalScale(15),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        height: verticalScale(28),
                      }}
                    >
                      <CustomText
                        fontSize={14}
                        fontFamily="medium"
                        color={COLORS.lightGrey}
                      >
                        Free
                      </CustomText>
                    </View>
                    <View
                      style={{
                        backgroundColor: COLORS.greenBg,
                        paddingHorizontal: horizontalScale(15),
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        height: verticalScale(28),
                      }}
                    >
                      <CustomText
                        fontSize={10}
                        fontFamily="medium"
                        color={COLORS.green}
                      >
                        Plus
                      </CustomText>
                    </View>
                  </View>
                  {selectedPlanId &&
                    Object.entries(
                      plansPrices.filter(
                        (plan) => plan._id === selectedPlanId
                      )[0]?.perks
                    ).map(([key, value], index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingVertical: verticalScale(8),
                          }}
                        >
                          <CustomText
                            fontSize={14}
                            color={COLORS.darkBLue}
                            fontFamily="medium"
                          >
                            {key}
                          </CustomText>

                          <View
                            style={{
                              flexDirection: "row",
                              gap: horizontalScale(75),
                              paddingEnd: horizontalScale(10),
                            }}
                          >
                            {basicFeatureList[index] === "Yes" ? (
                              <CustomIcon
                                Icon={ICONS.greenCheckBox}
                                height={20}
                                width={20}
                              />
                            ) : (
                              <CustomText
                                fontSize={12}
                                color={COLORS.darkBLue}
                                fontFamily="regular"
                              >
                                {basicFeatureList[index]}
                              </CustomText>
                            )}

                            {value === "Yes" ? (
                              <CustomIcon
                                Icon={ICONS.greenCheckBox}
                                height={20}
                                width={20}
                              />
                            ) : (
                              <CustomText fontSize={12} color={COLORS.darkBLue}>
                                {value}
                              </CustomText>
                            )}
                          </View>
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>

            <View style={{ gap: verticalScale(20) }}>
              {cardData.map((item, index) => (
                <View key={index}>
                  <View
                    style={{
                      gap: verticalScale(5),
                    }}
                  >
                    <CustomText
                      fontSize={18}
                      fontFamily="bold"
                      color={COLORS.darkBLue}
                    >
                      {item.heading}
                    </CustomText>
                    {item.title && (
                      <CustomText
                        fontSize={14}
                        fontFamily="regular"
                        color={COLORS.darkBLue}
                      >
                        {item.title}
                      </CustomText>
                    )}
                  </View>
                  <Image source={item.IMG} style={styles.cardImg} />
                  <View style={{ gap: verticalScale(5) }}>
                    {item.subHeading && (
                      <CustomText
                        fontSize={14}
                        fontFamily="semiBold"
                        color={COLORS.darkBLue}
                      >
                        {item.subHeading}
                      </CustomText>
                    )}
                    <CustomText
                      fontSize={14}
                      fontFamily="regular"
                      color={COLORS.darkBLue}
                    >
                      {item.description}
                    </CustomText>
                    {item.name && (
                      <CustomText
                        fontSize={14}
                        fontFamily="regular"
                        color={COLORS.darkBLue}
                        style={{ textAlign: "right" }}
                      >
                        {item.name}
                      </CustomText>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
};

export default MemberShip;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    gap: verticalScale(20),
  },
  backButton: {
    padding: horizontalScale(5),
  },
  imgStyle: {
    height: hp(25),
    width: wp(65),
    resizeMode: "contain",
    alignSelf: "center",
  },
  cardImg: {
    height: hp(40),
    width: wp(90),
    resizeMode: "contain",
    borderRadius: 16,
  },
});

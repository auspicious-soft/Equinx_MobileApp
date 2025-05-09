import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { MemberShipScreenProps } from "../../Typings/route";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../../Components/PrimaryButton";

const planData = [
  {
    id: "basic",
    title: "Basic",
    durationMonths: 3,
    monthlyPrice: 11.66,
    annualPriceEquivalent: 34.99,
    isBestPrice: false,
  },
  {
    id: "best",
    title: "Best price",
    durationMonths: 12,
    monthlyPrice: 6.66,
    annualPriceEquivalent: 79.99,
    isBestPrice: true,
  },
  {
    id: "popular",
    title: "Popular",
    durationMonths: 6,
    monthlyPrice: 6.66,
    annualPriceEquivalent: 49.99,
    isBestPrice: false,
  },
];

const MemberShip: FC<MemberShipScreenProps> = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const PlanCard = ({ plan }: any) => {
    const isSelected = selectedPlanId === plan.id;

    return (
      <TouchableOpacity
        onPress={() => handleSelectPlan(plan.id)}
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
          {plan.durationMonths}
          {"\n"}Months
        </CustomText>
        <CustomText
          color={COLORS.darkBLue}
          fontSize={14}
          style={{ textAlign: "center" }}
        >
          {`$${plan.monthlyPrice.toFixed(2)}/month`}
        </CustomText>
        <CustomText
          color={COLORS.lightGrey}
          fontSize={12}
          style={{ textAlign: "center" }}
        >
          {`only $${plan.annualPriceEquivalent.toFixed(2)}  \n ${
            plan.durationMonths === 3
              ? "for 3 months"
              : plan.durationMonths === 6
              ? "for 6 months"
              : "annually"
          }`}
        </CustomText>
        <View
          style={{
            position: "absolute",
            top: "-10%", // Align the top of the badge with the top of the card
            backgroundColor: isSelected
              ? COLORS.darkGreenGradient.start
              : "#F2F0F5",
            paddingHorizontal:
              plan.title.length > 6 ? verticalScale(10) : verticalScale(20),
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
            {plan.title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const featureList = [
    {
      title: "Fasting Timer",
      basic: true,
      plus: true,
    },
    {
      title: "Fasting stages",
      basic: true,
      plus: true,
    },
    {
      title: "Custom Fasting Goal",
      basic: true,
      plus: true,
    },
    {
      title: "Nutrition Scoring",
      basic: "Limited",
      plus: true,
    },
    {
      title: "Advanced analysis",
      basic: "Limited",
      plus: true,
    },
    {
      title: "Learning center",
      basic: "Limited",
      plus: true,
    },
  ];

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
                {planData.map((plan, index) => (
                  <PlanCard key={plan.id} plan={plan} />
                ))}
              </View>
              <PrimaryButton title="Upgrade now" onPress={() => {}} />
            </View>

            <View>
              <View
                style={{
                  gap: verticalScale(10),
                  paddingRight: horizontalScale(15),
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
                      // backgroundColor: "red",
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
                        Basic
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
                  {featureList.map((feature, index) => (
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
                        {feature.title}
                      </CustomText>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: horizontalScale(75),
                          paddingEnd: horizontalScale(10),
                        }}
                      >
                        {feature.basic === true ? (
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
                            {feature.basic}
                          </CustomText>
                        )}

                        {feature.plus === true ? (
                          <CustomIcon
                            Icon={ICONS.greenCheckBox}
                            height={20}
                            width={20}
                          />
                        ) : (
                          <CustomText fontSize={12} color={COLORS.darkBLue}>
                            {feature.plus}
                          </CustomText>
                        )}
                      </View>
                    </View>
                  ))}
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

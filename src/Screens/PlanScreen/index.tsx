import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import PrimaryButton from "../../Components/PrimaryButton";
import { PlanScreenProps } from "../../Typings/route";
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

const PlanScreen: FC<PlanScreenProps> = ({ navigation }) => {
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

  return (
    <LinearGradient
      colors={["#CCFFD5", "#BAFFA9", "#FFFFFF", "#FFFFFF", "#FFFFFF"]} // Light green to very light green to white
      style={styles.gradient}
      start={{ x: 0.3, y: 0 }} // Start from the top center
      end={{ x: 0.3, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <CustomIcon Icon={ICONS.BackArrow} height={30} width={30} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            gap: verticalScale(40),
          }}
        >
          <CustomIcon
            Icon={ICONS.PlanScreenIcon}
            width={wp(80)}
            height={hp(30)}
          />
          <View style={styles.textContainer}>
            <CustomText fontSize={22} fontFamily="bold" style={styles.title}>
              Get Your Personalized Meal Plan
            </CustomText>
            <CustomText style={styles.subtitle}>
              Get access to expert-crafted meal plans, a fasting tracker, and
              exclusive insights.
            </CustomText>
          </View>
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
          <PrimaryButton
            onPress={() => []}
            isFullWidth={false}
            title="Skip"
            bgColor={["transparent", "transparent"]}
            textColor={COLORS.lightGrey}
            textSize={12}
            textStyle={{ textDecorationLine: "underline" }}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: horizontalScale(20),
    gap: verticalScale(20),
  },
  header: {
    backgroundColor: "red",
  },
  backButton: {
    padding: horizontalScale(5),
  },
  imageContainer: {
    marginBottom: verticalScale(30),
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  title: {
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: horizontalScale(20),
  },
});

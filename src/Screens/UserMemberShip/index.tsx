import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { UserMemberShipScreenProps } from "../../Typings/route";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import ICONS from "../../Assets/Icons";
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

const UserMemberShip: FC<UserMemberShipScreenProps> = ({ navigation }) => {
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
          Membership
        </CustomText>
      </View>
      <View style={styles.headerContainer}>
        <View style={{ gap: verticalScale(10) }}>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            Basic Plan
          </CustomText>
          <CustomText fontSize={20} fontFamily="semiBold" color={COLORS.green}>
            3 Months
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(10) }}>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.slateGrey}
            style={{ textAlign: "right" }}
          >
            Expires on
          </CustomText>
          <CustomText
            fontSize={14}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            3 Jun 2025
          </CustomText>
        </View>
      </View>

      <View style={{ gap: verticalScale(30) }}>
        <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
          Upgrade your plan
        </CustomText>
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
          <PrimaryButton
            title="Upgrade Plan"
            onPress={() => {
              navigation.navigate("tabs", {
                screen: "settings",
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserMemberShip;

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
  headerContainer: {
    backgroundColor: "#EFFFF3",
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
});

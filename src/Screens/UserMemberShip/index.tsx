import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { UserMemberShipScreenProps } from "../../Typings/route";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import ICONS from "../../Assets/Icons";
import PrimaryButton from "../../Components/PrimaryButton";
import Toast from "react-native-toast-message";
import { CheckOutResponse, PricePlan } from "../../Typings/apiResponse";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setPricePlan } from "../../Redux/slices/planPrices";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

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
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const { plansPrices } = useAppSelector((state) => state.planPrices);

  const handlePricePlan = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<PricePlan[]>(ENDPOINTS.getPricePlan);
      console.log(response);
      if (response.data.success) {
        dispatch(setPricePlan(response.data.data));
        setSelectedProductId(response.data.data[0].productId);
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

  const handleCheckOut = async () => {
    const data = {
      productId: selectedProductId,
    };

    try {
      const response = await postData<CheckOutResponse>(
        ENDPOINTS.checkOutSession,
        data
      );
      console.log(response.data.data.clientSecret);

      if (response.data.success) {
        await initPaymentSheet({
          paymentIntentClientSecret: response.data.data.clientSecret,
          merchantDisplayName: "Equin Global",
        });
        openPaymentSheet();
        // Linking.openURL(response.data.data.url);
      }
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);

      Alert.alert(`Error: ${error.message}`);
    } else {
      Alert.alert("Success", "Payment confirmed!");
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedProductId(planId);
  };

  const PlanCard = ({ plan }: { plan: PricePlan }) => {
    const isSelected = selectedProductId === plan.productId;

    return (
      <TouchableOpacity
        onPress={() => {
          console.log("productId  ----->", plan.productId);
          handleSelectPlan(plan.productId);
        }}
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
          {/* {`only $${plan..toFixed(2)}  \n ${
            plan.durationMonths === 3
              ? "for 3 months"
              : plan.durationMonths === 6
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
            {plan.type}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    handlePricePlan();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={COLORS.green} size={30} />
      </View>
    );
  }

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
            {plansPrices.map((plan, index) => (
              <PlanCard key={plan.productId} plan={plan} />
            ))}
          </View>
          <PrimaryButton title="Upgrade Plan" onPress={handleCheckOut} />
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

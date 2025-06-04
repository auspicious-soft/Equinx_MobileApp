import {
  ActivityIndicator,
  Alert,
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
import {
  CheckOutResponse,
  PricePlan,
  PricePlanInfoResponse,
} from "../../Typings/apiResponse";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { setPricePlan } from "../../Redux/slices/planPrices";
import {
  initPaymentSheet,
  initStripe,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { PUBLISHABLE_KEY } from "@env";
import { setPricePlanInfo } from "../../Redux/slices/planPriceInfo";
import { useLanguage } from "../../Context/LanguageContext";

const UserMemberShip: FC<UserMemberShipScreenProps> = ({ navigation }) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const { translations } = useLanguage();

  const [selectedPlan, setSelectedPlan] = useState<PricePlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeInitialized, setIsStripeInitialized] = useState(false);

  const [isCheckOutLoading, setIsCheckOutLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { plansPrices } = useAppSelector((state) => state.planPrices);
  const { planPricesInfo } = useAppSelector((state) => state.planPricesInfo);

  // Initialize Stripe SDK
  useEffect(() => {
    const initializeStripe = async () => {
      try {
        if (!PUBLISHABLE_KEY) {
          throw new Error("Stripe publishable key is not set");
        }
        await initStripe({
          publishableKey: PUBLISHABLE_KEY,
        });
        console.log("Stripe initialized successfully");
        setIsStripeInitialized(true);
      } catch (error: any) {
        console.error("Failed to initialize Stripe:", error);
        Toast.show({
          type: "error",
          text1: error.message || "Failed to initialize payment system",
        });
      }
    };
    initializeStripe();
  }, []);

  // Fetch price plans
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await fetchData<PricePlan[]>(ENDPOINTS.getPricePlan);

        if (response.data.success) {
          dispatch(setPricePlan(response.data.data));

          // Set default to first plan initially
          setSelectedProductId(response.data.data[0]?.productId || null);
          setSelectedPlan(response.data.data[0] || null);

          // Now fetch price plan info to check for subscribed plan
          await fetchPricePlanInfo(response.data.data);
        } else {
          throw new Error("Failed to fetch price plans");
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
    fetchPlans();
  }, []);

  // Handle checkout
  const handleCheckOut = async () => {
    if (!isStripeInitialized) {
      Toast.show({
        type: "error",
        text1: "Payment system is not ready. Please try again.",
      });
      return;
    }

    if (!selectedProductId) {
      Toast.show({
        type: "error",
        text1: "Please select a plan",
      });
      return;
    }

    setIsCheckOutLoading(true);
    try {
      const data = { productId: selectedProductId };
      const response = await postData<CheckOutResponse>(
        ENDPOINTS.checkOutSession,
        data
      );

      if (response.data.success && response.data.data.clientSecret) {
        const { error: initError } = await initPaymentSheet({
          paymentIntentClientSecret: response.data.data.clientSecret,
          merchantDisplayName: "Equin Global",
        });

        if (initError) {
          throw new Error(
            `Payment initialization failed: ${initError.message}`
          );
        }

        await openPaymentSheet();
      } else {
        throw new Error("Invalid checkout response");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong during checkout",
      });
    } finally {
      setIsCheckOutLoading(false);
    }
  };

  // Open PaymentSheet
  const openPaymentSheet = async () => {
    const { error, paymentOption } = await presentPaymentSheet();
    if (error) {
      console.error("Payment sheet error:", error);
      Alert.alert(`Error: ${error.message}`);
    } else {
      Toast.show({
        type: "success",
        text1: "Payment successful",
      });
    }
  };

  // Move fetchPricePlanInfo to a separate function
  const fetchPricePlanInfo = async (availablePlans: PricePlan[]) => {
    try {
      const response = await fetchData<PricePlanInfoResponse[]>(
        ENDPOINTS.pricePlanInfo
      );

      if (response.data.success) {
        dispatch(setPricePlanInfo(response.data.data));

        // Find the subscribed plan
        const subscribedPlan = response.data.data.find(
          (plan) => plan.isSubscribed
        );

        if (subscribedPlan) {
          // Set the subscribed plan as the selected plan
          setSelectedProductId(subscribedPlan.productId);

          // Find the corresponding plan in availablePlans
          const planDetails = availablePlans.find(
            (p) => p.productId === subscribedPlan.productId
          );
          if (planDetails) {
            setSelectedPlan(planDetails);
          }
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  // Add this helper function to calculate expiry date
  const calculateExpiryDate = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedProductId(planId);
    const plan = plansPrices.find((p) => p.productId === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const PlanCard = ({ plan }: { plan: PricePlan }) => {
    const isSelected = selectedProductId === plan.productId;

    return (
      <TouchableOpacity
        onPress={() => {
          handleSelectPlan(plan.productId);
          console.log(plan.productId);
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
          {"\n"}
          {translations.months}
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
          {plan.description}
        </CustomText>
        <View
          style={{
            position: "absolute",
            top: "-10%",
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CustomIcon Icon={ICONS.BackArrow} />
        </TouchableOpacity>
        <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
          {translations.memberShip}
        </CustomText>
      </View>
      <View style={styles.headerContainer}>
        <View style={{ gap: verticalScale(10) }}>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            {selectedPlan?.type} Plan
          </CustomText>
          <CustomText fontSize={20} fontFamily="semiBold" color={COLORS.green}>
            {selectedPlan?.months} {translations.months}
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(10) }}>
          <CustomText
            fontSize={12}
            fontFamily="regular"
            color={COLORS.slateGrey}
            style={{ textAlign: "right" }}
          >
            {translations.expire}
          </CustomText>
          <CustomText
            fontSize={14}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            {calculateExpiryDate(selectedPlan?.months || 0)}
          </CustomText>
        </View>
      </View>
      <View style={{ gap: verticalScale(30) }}>
        <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
          {translations.upgrade_your_plan}
        </CustomText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: verticalScale(20),
          }}
        >
          {plansPrices.map((plan) => (
            <PlanCard key={plan.productId} plan={plan} />
          ))}
        </View>
        <PrimaryButton
          title={translations.upgrade_Plan}
          onPress={handleCheckOut}
          disabled={isCheckOutLoading || !isStripeInitialized}
          isLoading={isCheckOutLoading}
        />
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

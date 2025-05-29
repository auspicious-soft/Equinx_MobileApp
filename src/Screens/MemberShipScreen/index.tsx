import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import PrimaryButton from "../../Components/PrimaryButton";
import { setPricePlan } from "../../Redux/slices/planPrices";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { CheckOutResponse, PricePlan } from "../../Typings/apiResponse";
import { MemberShipScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import {
  initPaymentSheet,
  initStripe,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { PUBLISHABLE_KEY } from "@env";

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
  const dispatch = useAppDispatch();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckOutLoading, setIsCheckOutLoading] = useState(false);

  const [isStripeInitialized, setIsStripeInitialized] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const { plansPrices } = useAppSelector((state) => state.planPrices);

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

  const getPricePlan = async () => {
    // Check if plans already exist in Redux
    if (plansPrices && plansPrices.length > 0) {
      // Plans already exist, just set the selected plan
      setSelectedPlanId(plansPrices[0]._id);
      setSelectedProductId(plansPrices[0].productId || null);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchData<PricePlan[]>(ENDPOINTS.getPricePlan);
      console.log(response);

      if (response.data.success) {
        dispatch(setPricePlan(response.data.data));
        setSelectedPlanId(response.data.data[0]._id);
        setSelectedProductId(response.data.data[0].productId || null);
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

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log(error);

      Alert.alert(`Error: ${error.message}`);
    } else {
      navigation.goBack();
    }
  };

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const PlanCard = ({ plan }: { plan: PricePlan }) => {
    const isSelected = selectedPlanId === plan._id;

    return (
      <TouchableOpacity
        onPress={() => {
          handleSelectPlan(plan._id);
          setSelectedProductId(plan.productId || null);
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
                {plansPrices.map((plan) => (
                  <PlanCard key={plan._id} plan={plan} />
                ))}
              </View>
              <PrimaryButton
                title="Upgrade now"
                onPress={handleCheckOut}
                disabled={isCheckOutLoading || !isStripeInitialized}
                isLoading={isCheckOutLoading}
              />
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

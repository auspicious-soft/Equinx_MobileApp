import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { PolicyScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";

const Policy: FC<PolicyScreenProps> = ({ navigation }) => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
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
            Privacy Policy
          </CustomText>
        </View>
        <CustomText fontSize={12} fontFamily="regular" color={COLORS.darkBLue}>
          Welcome to [App Name] (“we,” “our,” or “us”). Your privacy is
          important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use our mobile application.
        </CustomText>

        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            1. Information We Collect
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            We may collect the following types of information:
          </CustomText>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  Personal Information: Name, email, age, gender, and other details provided during onboarding.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  Health Data: With your permission, we may collect data from Apple Health or Google Fit for tracking fasting and nutrition.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  Usage Data: Information on how you interact with the app, such as features used and time spent.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  Device Information: IP address, device type, and app version for performance monitoring.`}
            </CustomText>
          </View>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            2. How We Use Your Information
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            We use your data to:
          </CustomText>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {`•  Personalize your fasting and nutrition plans.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {`•  Improve app functionality and user experience.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {`•  Provide customer support and respond to inquiries.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {`•  Send important notifications related to fasting and meal plans (if enabled).`}
            </CustomText>
          </View>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            3. Data Sharing & Security
          </CustomText>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` • We do not sell your personal data to third parties.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  Data is securely stored and encrypted to protect your privacy.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  If using third-party services (e.g., Apple Health), their privacy policies apply.`}
            </CustomText>
          </View>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            4. Your Choices & Rights
          </CustomText>
          <View style={{ gap: verticalScale(6) }}>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` • You can update or delete your account in the app settings.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  You may disable data collection through your device settings.`}
            </CustomText>
            <CustomText
              fontSize={12}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              {` •  You can opt out of notifications anytime.`}
            </CustomText>
          </View>
        </View>

        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            5. Changes to This Policy
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            We may update this Privacy Policy from time to time. Any changes
            will be posted within the app.
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
            6. Contact Us
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            If you have questions about this policy, please contact us at
            [support@email.com].
          </CustomText>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Policy;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: horizontalScale(20),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
});

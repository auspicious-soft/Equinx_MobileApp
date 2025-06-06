import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { PolicyScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { PrivacyPolicyResponse } from "../../Typings/apiResponse";
import { useLanguage } from "../../Context/LanguageContext";

const Policy: FC<PolicyScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();
  const [policyData, setPolicyData] = useState<PrivacyPolicyResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const getPolicyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<PrivacyPolicyResponse>(
        ENDPOINTS.privacyPolicy,
        { type: "privacy" }
      );
      console.log(response);
      if (response) {
        setPolicyData(response.data.data);
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

  useEffect(() => {
    getPolicyData();
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
            {translations.privacy_policy}
          </CustomText>
        </View>
        <CustomText fontSize={12} fontFamily="regular" color={COLORS.darkBLue}>
          {policyData?.summary}
        </CustomText>

        {policyData?.content.map((item, index) => (
          <View style={{ gap: verticalScale(8) }} key={index}>
            <CustomText fontSize={12} color={COLORS.darkBLue} fontFamily="bold">
              {item.title}
            </CustomText>

            {item.subtitle && (
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {item.subtitle}
              </CustomText>
            )}

            {item.pointers.map((pointer, index) => (
              <View style={{ gap: verticalScale(6) }}>
                <View style={{ flexDirection: "row", gap: horizontalScale(2) }}>
                  {pointer && (
                    <CustomText
                      fontSize={12}
                      fontFamily="regular"
                      color={COLORS.darkBLue}
                    >
                      {` • `}
                    </CustomText>
                  )}

                  {pointer && (
                    <CustomText
                      fontSize={12}
                      color={COLORS.darkBLue}
                      fontFamily="regular"
                      key={index}
                    >
                      {pointer}
                    </CustomText>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
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

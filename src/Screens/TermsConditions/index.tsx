import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { TermsResponse } from "../../Typings/apiResponse";
import ENDPOINTS from "../../APIService/endPoints";
import { fetchData } from "../../APIService/api";
import Toast from "react-native-toast-message";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import { useLanguage } from "../../Context/LanguageContext";
import { TermsCondtionScreenProps } from "../../Typings/route";

const TermsConditions: FC<TermsCondtionScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();

  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState<TermsResponse | null>(null);

  const getPolicyData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<TermsResponse>(ENDPOINTS.privacyPolicy, {
        type: "termsCondition",
      });
      console.log(response);
      if (response) {
        setTermsData(response.data.data);
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
            {translations.terms_conditions}
          </CustomText>
        </View>
        <CustomText fontSize={12} fontFamily="regular" color={COLORS.darkBLue}>
          {termsData?.summary}
        </CustomText>

        {termsData?.content.map((item, index) => (
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

export default TermsConditions;

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

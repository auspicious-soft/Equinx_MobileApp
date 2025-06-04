import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SupportScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import ICONS from "../../Assets/Icons";
import Toast from "react-native-toast-message";
import { fetchData } from "../../APIService/api";
import { SupportResponse } from "../../Typings/apiResponse";
import ENDPOINTS from "../../APIService/endPoints";
import { useLanguage } from "../../Context/LanguageContext";

const questionData = [
  {
    id: 1,
    title: "1.  How do I start my first fasting session?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 2,
    title: "2.  Can I change my fasting schedule?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 3,
    title: "3.  How are my meal plans personalized?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 4,
    title: "4.  Do I need a subscription to access meal plans?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 5,
    title: "5.  How do I manage or cancel my subscription?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 6,
    title: "6.  Is there a free version of the app?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
  {
    id: 7,
    title: "7.  How do I sync Apple Health with the app?",
    description:
      'Simply select your fasting schedule from the home screen and tap "Start Fast." The timer will track your progress.',
  },
];

const Support: FC<SupportScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);
  const [supportData, setSupportData] = useState<SupportResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFaq = (id: string) => {
    setSelectedFaq((prev) => (prev === id ? null : id));
  };

  const openEmail = () => {
    const url = "mailto:equinglobal@gmail.com";
    Linking.openURL(url);
  };

  const openContact = () => {
    Linking.openURL("tel:+919882211037");
  };

  const getSupportData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData<SupportResponse>(
        ENDPOINTS.contactSupport
      );
      console.log(response);
      if (response.data.success) {
        setSupportData(response.data.data);
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
    getSupportData();
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
            {translations.support}
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontFamily="bold" fontSize={12} color={COLORS.darkBLue}>
            {translations.reach_us}
          </CustomText>
          <TouchableOpacity style={styles.contactContainer} onPress={openEmail}>
            <View style={styles.iconBg}>
              <CustomIcon Icon={ICONS.emailIcon} height={18} width={18} />
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={10}
                fontFamily="regular"
                color={COLORS.slateGrey}
              >
                {translations.send_email}
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {supportData?.email}
              </CustomText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactContainer}
            onPress={openContact}
          >
            <View style={styles.iconBg}>
              <CustomIcon Icon={ICONS.callIcon} height={18} width={18} />
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={10}
                fontFamily="regular"
                color={COLORS.slateGrey}
              >
                {translations.call_us}
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {supportData?.contactNumber}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ gap: verticalScale(6) }}>
          <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.faq_Question}
          </CustomText>
          {supportData?.faq.map((item, index) => (
            <View style={styles.questionWrapper} key={index}>
              <TouchableOpacity
                style={styles.questionBtn}
                onPress={() => toggleFaq(item._id)}
              >
                <CustomText
                  fontSize={14}
                  fontFamily="semiBold"
                  color={COLORS.darkBLue}
                >
                  {item.question}
                </CustomText>

                <CustomIcon
                  Icon={
                    selectedFaq === item._id
                      ? ICONS.decrementIcon
                      : ICONS.incrementIcon
                  }
                  height={16}
                  width={16}
                />
              </TouchableOpacity>

              {selectedFaq === item._id && (
                <View style={{ paddingHorizontal: horizontalScale(10) }}>
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    {item.answer}
                  </CustomText>
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Support;

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
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(10),
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
  iconBg: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  questionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionWrapper: {
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(10),
    gap: verticalScale(8),
  },
});

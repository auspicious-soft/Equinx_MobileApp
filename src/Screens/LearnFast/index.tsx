import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { LearnFastScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import IMAGES from "../../Assets/Images";
import { useLanguage } from "../../Context/LanguageContext";

const LearnFast: FC<LearnFastScreenProps> = ({ navigation, route }) => {
  const { data } = route.params;
  const { translations } = useLanguage();
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
            {translations.learn_how_fast}
          </CustomText>
        </View>

        {data ? (
          <>
            <View style={{ gap: verticalScale(5) }}>
              <Image source={data.mainImage} style={styles.imgStyle} />
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {/* {translations.Fast_para} */}
                {data.description}
              </CustomText>
            </View>
            <View style={{ gap: verticalScale(8) }}>
              <View style={{ gap: verticalScale(5) }}>
                <CustomText
                  fontSize={14}
                  fontFamily="bold"
                  color={COLORS.darkBLue}
                >
                  {/* {translations.choose_your_fasting} */}
                  {data.sections[0].title}
                </CustomText>
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {/* {translations.fastingPlan_para} */}
                  {data.sections[0].content}
                </CustomText>
              </View>
              <Image source={data.sections[0].image} style={styles.imgStyle} />
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {/* {translations.staying_on_track} */}
                {data.sections[1].title}
              </CustomText>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {/* {translations.staying_on_track_para} */}
                {data.sections[1].content}
              </CustomText>
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {/* {translations.overcoming_challenges} */}
                {data.sections[2].title}
              </CustomText>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {/* {translations.ovrecoming_challenges_para} */}
                {data.sections[2].content}
              </CustomText>
            </View>
          </>
        ) : (
          <>
            <View style={{ gap: verticalScale(5) }}>
              <Image source={IMAGES.captureMealImg} style={styles.imgStyle} />
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {translations.Fast_para}
              </CustomText>
            </View>
            <View style={{ gap: verticalScale(8) }}>
              <View style={{ gap: verticalScale(5) }}>
                <CustomText
                  fontSize={14}
                  fontFamily="bold"
                  color={COLORS.darkBLue}
                >
                  {translations.choose_your_fasting}
                </CustomText>
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {translations.fastingPlan_para}
                </CustomText>
              </View>
              <Image source={IMAGES.macroMealImg} style={styles.imgStyle} />
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {translations.staying_on_track}
              </CustomText>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {translations.staying_on_track_para}
              </CustomText>
            </View>
            <View style={{ gap: verticalScale(4) }}>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {translations.overcoming_challenges}
              </CustomText>
              <CustomText
                fontSize={14}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {translations.ovrecoming_challenges_para}
              </CustomText>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default LearnFast;

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
  imgStyle: {
    height: hp(40),
    width: wp(90),
    resizeMode: "cover",
    borderRadius: 16,
  },
});

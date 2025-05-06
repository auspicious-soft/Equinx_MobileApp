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

const LearnFast: FC<LearnFastScreenProps> = ({ navigation }) => {
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
            Learn how to Fast
          </CustomText>
        </View>

        <View style={{ gap: verticalScale(5) }}>
          <Image source={IMAGES.captureMealImg} style={styles.imgStyle} />
          <CustomText
            fontSize={14}
            fontFamily="regular"
            color={COLORS.darkBLue}
          >
            Intermittent fasting is a simple yet powerful way to improve health
            and energy. It cycles between periods of eating and fasting, helping
            your body burn fat more efficiently while supporting overall
            well-being.
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(8) }}>
          <View style={{ gap: verticalScale(5) }}>
            <CustomText fontSize={14} fontFamily="bold" color={COLORS.darkBLue}>
              Choosing Your Fasting Plan
            </CustomText>
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
            >
              There are different fasting schedules, but the most popular one is
              16:8—fast for 16 hours and eat within an 8-hour window. More
              advanced options like 18:6 or OMAD (One Meal a Day) offer deeper
              benefits but require gradual adaptation.
            </CustomText>
          </View>
          <Image source={IMAGES.macroMealImg} style={styles.imgStyle} />
        </View>
        <View style={{ gap: verticalScale(4) }}>
          <CustomText fontSize={14} color={COLORS.darkBLue} fontFamily="bold">
            Staying on Track
          </CustomText>
          <CustomText
            fontSize={14}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            During fasting hours, drink water, herbal tea, or black coffee to
            stay hydrated. Avoid sugary drinks or snacks that break your fast.
            When it’s time to eat, focus on nutritious meals that fuel your body
            properly.
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(4) }}>
          <CustomText fontSize={14} color={COLORS.darkBLue} fontFamily="bold">
            Overcoming Challenges
          </CustomText>
          <CustomText
            fontSize={14}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            Feeling hungry at first is normal. Your body will adjust! Start
            slow, stay consistent, and listen to your body. If you feel low on
            energy, ensure you're getting enough electrolytes and quality sleep.
          </CustomText>
        </View>
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

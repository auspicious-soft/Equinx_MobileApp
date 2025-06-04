import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import { SyncScreenProps } from "../../Typings/route";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { useLanguage } from "../../Context/LanguageContext";

const Sync: FC<SyncScreenProps> = ({ navigation }) => {
  const { translations } = useLanguage();
  const [isToggled, setIsToggled] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isToggled ? 0 : 1;

    Animated.timing(toggleAnim, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setIsToggled(!isToggled);
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // This depends on your knob/container width
  });
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
          Sync
        </CustomText>
      </View>

      <View style={styles.header}>
        <View style={{ gap: verticalScale(5), width: "70%" }}>
          <CustomText
            fontSize={14}
            fontFamily="regular"
            color={COLORS.darkBLue}
          >
            {translations.apple_health}
          </CustomText>
          <CustomText
            fontSize={10}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            {translations.apple_health_para}
          </CustomText>
        </View>
        <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
          <Animated.View
            style={{
              width: 40,
              height: 20,
              borderRadius: 10,
              backgroundColor: COLORS.greyishWhite,
              padding: 2,
              justifyContent: "center",
            }}
          >
            <Animated.View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: COLORS.green,
                transform: [{ translateX }],
              }}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Sync;

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    justifyContent: "space-between",
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
    paddingVertical: verticalScale(10),
  },
});

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { RecalculateScreenProps } from "../../Typings/route";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../../Components/CustomText";
import PrimaryButton from "../../Components/PrimaryButton";

const kcalData = [
  {
    id: 1,
    kcal: "Less than 1500 kcal",
  },
  {
    id: 2,
    kcal: "Between 1500-2000 kcal ",
  },
  {
    id: 3,
    kcal: "Between 2000-2500 kcal ",
  },
  {
    id: 4,
    kcal: "More than 2500 kcal ",
  },
  {
    id: 5,
    kcal: "I’m not sure",
  },
];

const Recalculate: FC<RecalculateScreenProps> = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const handleKcal = (id: number) => {
    setIsSelected((prev) => (prev === id ? null : id));
  };
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
          Recalculate
        </CustomText>
      </View>
      <View style={styles.header}>
        <CustomText
          fontSize={22}
          fontFamily="bold"
          color={COLORS.darkBLue}
          style={{ textAlign: "center" }}
        >
          How many calories do you consume daily on average?
        </CustomText>
        <CustomText
          fontSize={12}
          fontFamily="regular"
          color={COLORS.darkBLue}
          style={{ textAlign: "center" }}
        >
          Estimating your daily intake helps us provide better fasting and meal
          recommendations.
        </CustomText>
      </View>
      <View style={{ gap: verticalScale(30) }}>
        <View style={{ gap: verticalScale(10) }}>
          {kcalData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.kcalBtn,
                {
                  borderColor:
                    isSelected === item.id ? COLORS.green : COLORS.greyishWhite,
                  backgroundColor:
                    isSelected === item.id ? COLORS.greyishWhite : COLORS.white,
                },
              ]}
              onPress={() => handleKcal(item.id)}
            >
              <CustomText fontSize={14} fontFamily="regular">
                {item.kcal}
              </CustomText>
              {isSelected === item.id && (
                <CustomIcon
                  Icon={ICONS.WhiteTickwithBlueBg}
                  height={15}
                  width={15}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <PrimaryButton title="Next" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};

export default Recalculate;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(20),
    gap: verticalScale(20),
    backgroundColor: COLORS.white,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  header: {
    gap: verticalScale(10),
    flex: 1,
  },
  kcalBtn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

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
import CalorieCalculator from "../../Components/Modals/CalorieCalculator";

// const kcalData = [
//   {
//     id: 1,
//     kcal: "Less than 1500 kcal",
//   },
//   {
//     id: 2,
//     kcal: "Between 1500-2000 kcal ",
//   },
//   {
//     id: 3,
//     kcal: "Between 2000-2500 kcal ",
//   },
//   {
//     id: 4,
//     kcal: "More than 2500 kcal ",
//   },
//   {
//     id: 5,
//     kcal: "I’m not sure",
//   },
// ];

const questionData = [
  {
    _id: "682aba4beebb44f35f3a78f3",
    text: "How many calories do you consume daily on average?",
    subtitle:
      "Estimating your daily intake helps us provide better fasting and meal recommendations.",
    type: "mcq",
    next: "info5",
    options: [
      {
        text: "Less than 1500 kcal",
        value: 33,
        hasIcon: false,
        _id: "682aba4beebb44f35f3a78f4",
      },
      {
        text: "Between 1500-2000 kcal",
        value: 34,
        hasIcon: false,
        _id: "682aba4beebb44f35f3a78f5",
      },
      {
        text: "Between 2000-2500 kcal",
        value: 35,
        hasIcon: false,
        _id: "682aba4beebb44f35f3a78f6",
      },
      {
        text: "More than 2500 kcal",
        value: 36,
        hasIcon: false,
        _id: "682aba4beebb44f35f3a78f7",
      },
      {
        text: "I’m not sure",
        value: 37,
        hasIcon: false,
        _id: "682aba4beebb44f35f3a78f8",
      },
    ],
    order: 9,
    __v: 0,
    createdAt: "2025-05-19T04:57:47.613Z",
    updatedAt: "2025-05-19T04:57:47.613Z",
  },
];

const Recalculate: FC<RecalculateScreenProps> = ({ navigation }) => {
  const [isSelected, setIsSelected] = useState<string | null>("");
  const [selectedKcal, setSelectedKcal] = useState<string | null>(null);

  const [isModal, setIsModal] = useState(false);

  const closeModal = () => {
    setIsModal(false);
  };

  const handleKcal = (id: string) => {
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
          {questionData[0].text}
        </CustomText>
        <CustomText
          fontSize={12}
          fontFamily="regular"
          color={COLORS.darkBLue}
          style={{ textAlign: "center" }}
        >
          {questionData[0].subtitle}
        </CustomText>
      </View>
      <View style={{ gap: verticalScale(30) }}>
        <View style={{ gap: verticalScale(10) }}>
          {questionData[0].options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.kcalBtn,
                {
                  borderColor:
                    isSelected === item._id
                      ? COLORS.green
                      : COLORS.greyishWhite,
                  backgroundColor:
                    isSelected === item._id
                      ? COLORS.greyishWhite
                      : COLORS.white,
                },
              ]}
              onPress={() => {
                handleKcal(item._id);

                if (item.text !== "I’m not sure") {
                  setSelectedKcal(
                    item.text.split(" ")[item.text.split(" ").length - 2] +
                      " " +
                      item.text.split(" ")[item.text.split(" ").length - 1]
                  );
                } else {
                  setSelectedKcal(item.text);
                }
              }}
            >
              <CustomText fontSize={14} fontFamily="regular">
                {item.text}
              </CustomText>
              {isSelected === item._id && (
                <CustomIcon
                  Icon={ICONS.WhiteTickwithBlueBg}
                  height={15}
                  width={15}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <PrimaryButton
          title="Next"
          onPress={() => {
            setIsModal(true);
          }}
          disabled={isSelected === null}
        />
        <CalorieCalculator
          closeModal={closeModal}
          isVisible={isModal}
          kcal={selectedKcal}
        />
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

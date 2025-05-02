import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../CustomText";
import PrimaryButton from "../PrimaryButton";

type MacroBalanceModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const MacroBalanceModal: FC<MacroBalanceModalProps> = ({
  isVisible,
  closeModal,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={closeModal}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={closeModal}
        activeOpacity={1}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              paddingHorizontal: horizontalScale(20),
              paddingTop: verticalScale(15),
              gap: verticalScale(10),
            }}
          >
            <View style={{ gap: verticalScale(8) }}>
              <CustomText
                fontSize={18}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                Macro balance
              </CustomText>
              <CustomText
                fontSize={14}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                Track your macros and optimize your daily nutrition for better
                results.
              </CustomText>
            </View>

            <View style={styles.percentageContainer}>
              <CustomText
                fontSize={26}
                fontFamily="bold"
                color={COLORS.green}
                style={{ textAlign: "center" }}
              >
                85%
              </CustomText>
              <CustomText
                fontSize={10}
                fontFamily="regular"
                color={COLORS.green}
                style={{ textAlign: "center" }}
              >
                Great job! Your macros are well-balanced.
              </CustomText>
            </View>

            <View style={styles.kcalContainer}>
              <CustomText
                fontFamily="regular"
                fontSize={12}
                color={COLORS.darkBLue}
              >
                Daily kcal intake required
              </CustomText>
              <CustomText fontFamily="bold" fontSize={12} color={COLORS.green}>
                1540 Kcal
              </CustomText>
            </View>
            <PrimaryButton title="Recalculate" onPress={() => {}} />
          </View>

          <View
            style={{
              backgroundColor: COLORS.greyishWhite,
              paddingHorizontal: horizontalScale(20),
              paddingTop: verticalScale(15),
              paddingBottom: verticalScale(10),
            }}
          >
            <View style={{ gap: verticalScale(5) }}>
              <CustomText
                fontSize={18}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                Breakdown of Macronutrients
              </CustomText>
              <View style={styles.breakdownContainer}>
                <View style={{ gap: verticalScale(5) }}>
                  <CustomText
                    fontSize={12}
                    fontFamily="medium"
                    color={COLORS.slateGrey}
                  >
                    Macronutrient
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    fontFamily="medium"
                    color={COLORS.darkBLue}
                  >
                    Protein
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    fontFamily="medium"
                    color={COLORS.darkBLue}
                  >
                    Carbs
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    fontFamily="medium"
                    color={COLORS.darkBLue}
                  >
                    Fats
                  </CustomText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: horizontalScale(20),
                    alignItems: "center",
                  }}
                >
                  <View style={{ gap: verticalScale(5), alignItems: "center" }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      Recommended
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                  </View>
                  <View style={{ gap: verticalScale(5), alignItems: "center" }}>
                    <CustomText
                      fontSize={12}
                      fontFamily="medium"
                      color={COLORS.slateGrey}
                    >
                      Consumed
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                    <CustomText
                      fontSize={14}
                      fontFamily="medium"
                      color={COLORS.darkBLue}
                    >
                      87g
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
            }}
          >
            <View
              style={{
                gap: verticalScale(5),
              }}
            >
              <CustomText
                fontFamily="bold"
                color={COLORS.darkBLue}
                fontSize={18}
              >
                Recommendations
              </CustomText>
              <View style={{ gap: verticalScale(2) }}>
                <CustomText
                  fontSize={14}
                  color={COLORS.darkBLue}
                  fontFamily="regular"
                >
                  {` • Eat more lean protein to reach your goal.`}
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={COLORS.darkBLue}
                  fontFamily="regular"
                >
                  {` • Reduce carb intake slightly for better balance.`}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MacroBalanceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.white,
    gap: verticalScale(15),
    borderRadius: 28,
    overflow: "hidden",
    paddingBottom: verticalScale(20),
    borderWidth: 2,
    borderColor: COLORS.green,
  },
  percentageContainer: {
    backgroundColor: COLORS.greyishWhite,
    alignItems: "center",
    borderRadius: 10,
    paddingTop: verticalScale(5),
    gap: verticalScale(5),
    paddingBottom: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
  },
  kcalContainer: {
    borderColor: COLORS.green,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(8),
  },
  breakdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderColor: COLORS.greyishWhite,
    borderWidth: 1,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

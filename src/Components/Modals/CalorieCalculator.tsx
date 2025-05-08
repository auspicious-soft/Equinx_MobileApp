import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect } from "react";
import { CustomText } from "../CustomText";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

import PrimaryButton from "../PrimaryButton";
import COLORS from "../../Utilities/Colors";

type CalorieCalculatorProps = {
  isVisible: boolean;
  closeModal: () => void;
  kcal: string | null;
};

const CalorieCalculator: FC<CalorieCalculatorProps> = ({
  isVisible,
  closeModal,
  kcal,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={closeModal}
      animationType="fade"
    >
      <TouchableOpacity
        //   onPress={closeModal}
        activeOpacity={1}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <View style={styles.headingContainer}>
            <CustomText
              fontFamily={"semiBold"}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              Daily Calorie Intake Calculator
            </CustomText>
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
              gap: verticalScale(20),
            }}
          >
            <CustomText
              fontSize={14}
              fontFamily="regular"
              color={COLORS.darkBLue}
              style={{ textAlign: "center" }}
            >
              Your daily intake of calories should be
            </CustomText>
            <View style={styles.titleContainer}>
              <CustomText>{kcal}</CustomText>
            </View>
            <PrimaryButton
              title="Okay! Got it."
              onPress={() => {
                closeModal();
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CalorieCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    zIndex: 1,
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.white,
    gap: verticalScale(25),
    borderRadius: 28,
    overflow: "hidden",
    paddingBottom: verticalScale(20),
    borderWidth: 2,
    borderColor: COLORS.green,
    zIndex: 2,
  },
  headingContainer: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(15),
    borderRightColor: COLORS.lightGrey,
  },
  titleContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
});

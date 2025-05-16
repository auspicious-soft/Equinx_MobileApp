import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../PrimaryButton";

type MealModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  heading: string;
  onpress: () => void;
  mealType: string;
  timing: string;
  kcal: string;
  title1: string;
  title2: string;
  title3: string;
};

const MealModal: FC<MealModalProps> = ({
  isVisible,
  closeModal,
  heading,
  onpress,
  mealType,
  timing,
  kcal,
  title1,
  title2,
  title3,
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
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true} // Capture touch events
          onResponderRelease={(e) => e.stopPropagation()} // Prevent propagation
        >
          <View style={styles.headingContainer}>
            <CustomText
              fontFamily={"semiBold"}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              {heading}
            </CustomText>
          </View>
          <View style={styles.whiteBox}>
            <View
              style={{
                gap: verticalScale(10),
              }}
            >
              <View style={styles.contentHeader}>
                <CustomText
                  fontSize={14}
                  color={COLORS.lightGrey}
                  fontFamily="semiBold"
                >
                  {mealType}
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={COLORS.green}
                  fontFamily="semiBold"
                >
                  {timing}
                </CustomText>
              </View>
              <View style={styles.kcalWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="medium"
                  color={COLORS.green}
                >
                  {kcal}
                </CustomText>
              </View>
              <View
                style={{
                  gap: verticalScale(8),

                  paddingHorizontal: horizontalScale(8),
                }}
              >
                <CustomText
                  fontSize={14}
                  color={COLORS.darkBLue}
                  fontFamily="medium"
                >
                  {` •  ${title1}`}
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={COLORS.darkBLue}
                  fontFamily="medium"
                >
                  {` •  ${title2}`}
                </CustomText>
                <CustomText
                  fontSize={14}
                  color={COLORS.darkBLue}
                  fontFamily="medium"
                >
                  {` •  ${title3}`}
                </CustomText>
              </View>
            </View>
            <PrimaryButton title="Okay" onPress={closeModal} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MealModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
  },
  headingContainer: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(15),
    borderRightColor: COLORS.lightGrey,
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
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  whiteBox: {
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    gap: verticalScale(15),
  },
  kcalWrapper: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(8),
    borderRadius: 8,
    width: verticalScale(85),
    justifyContent: "center",
    alignItems: "center",
  },
});

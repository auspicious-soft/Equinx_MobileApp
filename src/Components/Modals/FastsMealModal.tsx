import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";
import COLORS from "../../Utilities/Colors";
import PrimaryButton from "../PrimaryButton";
import { Meal } from "../../Typings/apiResponse";
import { useLanguage } from "../../Context/LanguageContext";

type FastsMealModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  data: Meal;
  onpress: () => void;
};

const FastsMealModal: FC<FastsMealModalProps> = ({
  isVisible,
  closeModal,
  data,
  onpress,
}) => {
  const { translations } = useLanguage();

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
              {translations.meal_Plan}
            </CustomText>
          </View>
          <View style={styles.whiteBox}>
            {data && (
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
                    {data?.meal_type || "Breakfast"}
                  </CustomText>
                  <CustomText
                    fontSize={14}
                    color={COLORS.green}
                    fontFamily="semiBold"
                  >
                    {data.meal_time.match(/\((\d{1,2}:\d{2})/)?.[1]}
                  </CustomText>
                </View>
                <View style={styles.kcalWrapper}>
                  <CustomText
                    fontSize={12}
                    fontFamily="medium"
                    color={COLORS.green}
                  >
                    {data.calories}
                  </CustomText>
                </View>
                <View
                  style={{
                    gap: verticalScale(8),

                    paddingHorizontal: horizontalScale(8),
                  }}
                >
                  {data.items.map((item, index) => (
                    <CustomText
                      fontSize={14}
                      color={COLORS.darkBLue}
                      fontFamily="medium"
                      key={index}
                    >
                      {`•  ${item}`}
                    </CustomText>
                  ))}
                </View>
              </View>
            )}
            <PrimaryButton title="Okay" onPress={closeModal} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FastsMealModal;

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

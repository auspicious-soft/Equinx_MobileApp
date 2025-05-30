import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../CustomText";
import PrimaryButton from "../PrimaryButton";

const stars = [
  {
    id: 1,
    icon: ICONS.whiteStar,
  },
  {
    id: 2,
    icon: ICONS.whiteStar,
  },
  {
    id: 3,
    icon: ICONS.whiteStar,
  },
  {
    id: 4,
    icon: ICONS.whiteStar,
  },
  {
    id: 5,
    icon: ICONS.whiteStar,
  },
];

type RateUsModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const RateUs: FC<RateUsModalProps> = ({ isVisible, closeModal }) => {
  const [rating, setRating] = useState<number | null>(null);

  const handleStarPress = (starId: number) => {
    // If the same star is clicked again, reduce rating by 1
    if (rating === starId) {
      setRating(starId - 1 > 0 ? starId - 1 : null);
    } else {
      setRating(starId);
    }
  };

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
          onResponderRelease={(e) => e.stopPropagation()}
        >
          <CustomIcon Icon={ICONS.rateFruitIcon} height={100} width={100} />
          <View style={styles.rateContainer}>
            <CustomText fontSize={22} color={COLORS.darkBLue} fontFamily="bold">
              Please Rate us!
            </CustomText>
            <View style={styles.starContainer}>
              {stars.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(item.id)}
                >
                  <CustomIcon
                    Icon={
                      rating !== null && item.id <= rating
                        ? ICONS.greenStar
                        : ICONS.whiteStar
                    }
                    height={25}
                    width={25}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <PrimaryButton
            title="Submit"
            onPress={closeModal}
            isFullWidth={false}
            style={styles.btnStyle}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default RateUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
  },
  modalContent: {
    backgroundColor: COLORS.white,
    width: "100%",
    gap: verticalScale(15),
    borderRadius: 28,
    overflow: "hidden",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    borderColor: COLORS.green,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rateContainer: {
    gap: verticalScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  btnStyle: {
    width: wp(70),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});

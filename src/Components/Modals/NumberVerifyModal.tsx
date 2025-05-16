import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Colors from "../../Utilities/Colors";
import { CustomText } from "../CustomText";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import PrimaryButton from "../PrimaryButton";
import COLORS from "../../Utilities/Colors";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";

type NumberVerifyModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  title: string;
  subTitle: string;
  onpress: () => void;
};

const NumberVerifyModal: FC<NumberVerifyModalProps> = ({
  isVisible,
  closeModal,
  title,
  onpress,
  subTitle,
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
          <CustomIcon Icon={ICONS.AppLogo} height={60} width={60} />

          <View
            style={{
              gap: verticalScale(10),

              paddingHorizontal: horizontalScale(15),
            }}
          >
            <CustomText
              fontFamily={"bold"}
              fontSize={22}
              style={{ textAlign: "center" }}
            >
              {title}
            </CustomText>
            <CustomText
              color={Colors.lightGrey}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              {subTitle}
            </CustomText>
          </View>

          <PrimaryButton
            title="Login"
            onPress={onpress}
            textColor={Colors.white}
            style={{
              width: wp(70),
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default NumberVerifyModal;

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
    alignItems: "center",
    gap: verticalScale(15),
    borderRadius: 30,
    paddingVertical: verticalScale(25),
    paddingHorizontal: horizontalScale(20),
  },
});

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../CustomText";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import PrimaryButton from "../PrimaryButton";

type RecordIntakeModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  heading: string;
  title: string;
};

const RecordIntakeModal: FC<RecordIntakeModalProps> = ({
  isVisible,
  closeModal,
  heading,
  title,
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
          <View style={styles.headingContainer}>
            <CustomText
              fontFamily={"semiBold"}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              {heading}
            </CustomText>
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
              gap: verticalScale(20),
            }}
          >
            <TouchableOpacity style={styles.titleContainer}>
              <CustomText>{title}</CustomText>
              <CustomIcon Icon={ICONS.DropdownIcon} height={8} width={8} />
            </TouchableOpacity>
            <PrimaryButton
              title="Save"
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

export default RecordIntakeModal;

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(8),
  },
});

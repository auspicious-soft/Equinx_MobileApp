import React, { FC } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../Utilities/Colors";
import ICONS from "../../Assets/Icons";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import { CustomText } from "../CustomText";
import CustomIcon from "../CustomIcon";
import COLORS from "../../Utilities/Colors";

type UploadImageOptionsProps = {
  isModalVisible: boolean;
  closeModal: () => void;
  onPressCamera: () => void;
  onPressGallery: () => void;
  title?: string;
};

const UploadImageOptions: FC<UploadImageOptionsProps> = ({
  isModalVisible,
  closeModal,
  onPressCamera,
  onPressGallery,
  title = "Select Image Upload Option",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeModal}
        style={[
          styles.container,
          {
            // paddingVertical: insets.bottom + verticalScale(20),
          },
        ]}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true} // Capture touch events
          onResponderRelease={(e) => e.stopPropagation()} // Prevent propagation
        >
          <View
            style={{
              height: 4,
              backgroundColor: Colors.slateGrey,
              width: wp(25),
              alignSelf: "center",
              borderRadius: 10,
            }}
          />
          <CustomText fontFamily="bold" fontSize={20} color={Colors.green}>
            {title}
          </CustomText>
          {/* <CustomIcon /> */}
          <View style={{ gap: verticalScale(15) }}>
            <TouchableOpacity
              onPress={onPressGallery}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(10),
                marginLeft: verticalScale(10),
              }}
            >
              <CustomIcon Icon={ICONS.galleryIcon} height={25} width={25} />
              <CustomText fontFamily="regular" color={COLORS.white}>
                Choose from Gallery
              </CustomText>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 0.3,
                borderColor: Colors.greyishWhite,
              }}
            />
            <TouchableOpacity
              onPress={onPressCamera}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(10),
                marginLeft: verticalScale(10),
              }}
            >
              <CustomIcon Icon={ICONS.cameraIcon} height={25} width={25} />
              <CustomText fontFamily="regular" color={COLORS.white}>
                Upload from Camera
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default UploadImageOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.darkBLue,
    width: wp(100),
    paddingTop: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    gap: verticalScale(30),
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingBottom: verticalScale(20),
  },
});

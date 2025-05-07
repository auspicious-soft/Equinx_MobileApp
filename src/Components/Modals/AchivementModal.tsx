import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../CustomText";

type AchivementModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const AchivementModal: FC<AchivementModalProps> = ({
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
      <ImageBackground
        source={IMAGES.greenBg}
        imageStyle={{ flex: 1 }}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <TouchableOpacity onPress={closeModal}>
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <View style={styles.notifyContainer}>
            <Image source={IMAGES.taskCompleteImg} style={styles.tickImg} />
            <View
              style={{
                gap: verticalScale(10),
                width: "80%",
              }}
            >
              <CustomText
                fontSize={14}
                fontFamily="medium"
                color={COLORS.darkBLue}
              >
                Task Completed
              </CustomText>
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                Fantastic job! You've successfully reached your calorie goal for
                today.
              </CustomText>
            </View>
          </View>
          <Image source={IMAGES.achievementImg} style={styles.centerImg} />
          <CustomText
            fontSize={14}
            fontFamily="regular"
            color={COLORS.darkBLue}
            style={{ textAlign: "center" }}
          >
            Congrats! You've completed 5 days on your journey. You're not
            walking but running towards your best version !
          </CustomText>
          <CustomText
            fontSize={14}
            fontFamily="medium"
            color={COLORS.darkBLue}
            style={{ textAlign: "center" }}
          >
            23 March, 2025
          </CustomText>
          <TouchableOpacity style={styles.shareContainer}>
            <CustomText fontSize={14} fontFamily="regular" color={COLORS.white}>
              Share
            </CustomText>
            <CustomIcon Icon={ICONS.shareIcon} height={16} width={16} />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </Modal>
  );
};

export default AchivementModal;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: horizontalScale(20),
  },
  notifyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  tickImg: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  centerImg: {
    height: hp(40),
    width: wp(80),
    alignSelf: "center",
    resizeMode: "contain",
  },
  shareContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    alignSelf: "center",
    borderRadius: 12,
    gap: horizontalScale(8),
    alignItems: "center",
  },
});

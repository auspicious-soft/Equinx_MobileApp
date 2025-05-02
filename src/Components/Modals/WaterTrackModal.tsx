import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import React, { FC, useState, useRef } from "react";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../CustomText";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import PrimaryButton from "../PrimaryButton";

type WaterTrackModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  heading: string;
  title: string;
  size: string;
  goal: string;
  reminder: string;
  description: string;
  ml: string;
  ml2: string;
};

const WaterTrackModal: FC<WaterTrackModalProps> = ({
  isVisible,
  closeModal,
  heading,
  title,
  size,
  goal,
  reminder,
  description,
  ml,
  ml2,
}) => {
  const [selectedContainer, setSelectedContainer] = useState<
    "bottle" | "glass"
  >("bottle");

  const [isToggled, setIsToggled] = useState(false);
  const toggleAnim = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const toValue = isToggled ? 0 : 1;

    Animated.timing(toggleAnim, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    setIsToggled(!isToggled);
  };

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // This depends on your knob/container width
  });

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
            }}
          >
            <View style={{ gap: verticalScale(10) }}>
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {title}
              </CustomText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSelectedContainer("bottle");
                  }}
                  style={[
                    styles.imgContianer,
                    {
                      borderColor:
                        selectedContainer === "bottle"
                          ? COLORS.green
                          : COLORS.greyishWhite,
                    },
                  ]}
                >
                  <Image
                    source={IMAGES.bottleImg}
                    style={{
                      height: hp(9),
                      width: wp(9),
                      resizeMode: "contain",
                    }}
                  />
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    Select Container
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedContainer("glass");
                  }}
                  style={[
                    styles.imgContianer,
                    {
                      borderColor:
                        selectedContainer === "glass"
                          ? COLORS.green
                          : COLORS.greyishWhite,
                    },
                  ]}
                >
                  <Image
                    source={IMAGES.glassImg}
                    style={{
                      height: hp(9),
                      width: wp(9),
                      resizeMode: "contain",
                    }}
                  />
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    Select Container
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.greyishWhite,
            }}
          />

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
            }}
          >
            <View style={{ gap: verticalScale(15) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {size}
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: horizontalScale(5),
                  }}
                >
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    {ml}
                  </CustomText>
                  <CustomIcon Icon={ICONS.rightArrow} height={13} width={13} />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {goal}
                </CustomText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: horizontalScale(5),
                  }}
                >
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    {ml2}
                  </CustomText>
                  <CustomIcon Icon={ICONS.rightArrow} height={13} width={13} />
                </View>
              </View>

              <View style={{ gap: verticalScale(5) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomText
                    fontSize={12}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    {reminder}
                  </CustomText>

                  <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
                    <Animated.View
                      style={{
                        width: 40,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: COLORS.greyishWhite,
                        padding: 2,
                        justifyContent: "center",
                      }}
                    >
                      <Animated.View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: COLORS.green,
                          transform: [{ translateX }],
                        }}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                </View>
                <CustomText
                  fontSize={10}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  {description}
                </CustomText>
              </View>
              <PrimaryButton
                title="Save"
                onPress={() => {
                  closeModal();
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default WaterTrackModal;

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
    gap: verticalScale(20),
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
  imgContianer: {
    width: "48%",
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: verticalScale(15),
    justifyContent: "center",
    alignItems: "center",
    gap: verticalScale(10),
    borderRadius: 12,
  },
});

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
import React, {
  FC,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
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
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";
import { useLanguage } from "../../Context/LanguageContext";

const containerSizeData = [
  {
    id: 1,
    size: 250,
  },
  {
    id: 2,
    size: 500,
  },
  {
    id: 3,
    size: 800,
  },
  {
    id: 4,
    size: 1000,
  },
];

const dailGoalData = [
  {
    id: 1,
    size: 2800,
  },
  {
    id: 2,
    size: 3600,
  },
  {
    id: 3,
    size: 4200,
  },
  {
    id: 4,
    size: 5000,
  },
];

type WaterTrackModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  selectedConatinerValue: string | number;
  setSelectedContainerValue: Dispatch<SetStateAction<string | number>>;
  selectedDailyGoal: string | number;
  setSelectedDailyGoal: Dispatch<SetStateAction<string | number>>;
  selectedContainer: string;
  setSelectedContainer: Dispatch<SetStateAction<string>>;
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
  getHomeData: () => void;
};

const WaterTrackModal: FC<WaterTrackModalProps> = ({
  isVisible,
  closeModal,
  selectedConatinerValue,
  setSelectedContainerValue,
  selectedDailyGoal,
  setSelectedDailyGoal,
  selectedContainer,
  setSelectedContainer,
  isToggled,
  setIsToggled,
  getHomeData,
}) => {
  const toggleAnim = useRef(new Animated.Value(0)).current;

  const { translations } = useLanguage();

  const [containerSize, setContainerSize] = useState<boolean>(false);
  const [dailyGoal, setDailyGoal] = useState<boolean>(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [error, setError] = useState({
    containerSize: "",
    dailyGoal: "",
    containerType: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      containerSize: "",
      dailyGoal: "",
      containerType: "",
    };

    if (selectedConatinerValue === 0) {
      errors.containerSize = "Please select a container size";
      isValid = false;
    }

    if (selectedDailyGoal === 0) {
      errors.dailyGoal = "Please select a daily goal";
      isValid = false;
    }

    if (selectedContainer === "") {
      errors.containerType = "Please select a container type";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  console.log(selectedDailyGoal);

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

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    const data = {
      containerType: selectedContainer,
      containerSize: selectedConatinerValue,
      dailyGoal: selectedDailyGoal,
      waterReminder: isToggled,
    };

    setIsButtonLoading(true);

    try {
      const response = await postData(ENDPOINTS.waterTracking, data);
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        closeModal();
        // setContainerSize(false);
        // setDailyGoal(false);
        getHomeData();
      }
    } catch (error: any) {
    } finally {
      setIsButtonLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      toggleAnim.setValue(isToggled ? 1 : 0);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={() => {
        closeModal();
        setContainerSize(false);
        setDailyGoal(false);
      }}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={() => {
          closeModal();
          setContainerSize(false);
          setDailyGoal(false);
        }}
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
              {translations.water_Option}
            </CustomText>
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
            }}
          >
            <View style={{ gap: verticalScale(10) }}>
              {error.containerSize && (
                <CustomText fontSize={10} fontFamily="regular" color="red">
                  {error.containerSize}
                </CustomText>
              )}
              {error.dailyGoal && (
                <CustomText fontSize={10} fontFamily="regular" color="red">
                  {error.dailyGoal}
                </CustomText>
              )}
              {error.containerSize && (
                <CustomText fontSize={10} fontFamily="regular" color="red">
                  {error.containerSize}
                </CustomText>
              )}
              <CustomText
                fontSize={12}
                fontFamily="regular"
                color={COLORS.darkBLue}
              >
                {translations.Select_Container}
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
                    {translations.Select_Container}
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
                    {translations.Select_Container}
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
                  {translations.Set_Container_Size}
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setDailyGoal(false);

                    setContainerSize(!containerSize);
                  }}
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
                    {selectedConatinerValue} {translations.ml}
                  </CustomText>
                  <CustomIcon
                    Icon={
                      containerSize === false
                        ? ICONS.ArrowDownIcon
                        : ICONS.ArrowUpIcon
                    }
                    height={8}
                    width={8}
                  />
                </TouchableOpacity>
              </View>

              {containerSize && (
                <View style={styles.sizeMlContainer}>
                  {containerSizeData.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedContainerValue(item.size);
                        setContainerSize(false);
                      }}
                    >
                      <CustomText
                        fontSize={12}
                        fontFamily="regular"
                        color={
                          selectedConatinerValue === item.size
                            ? COLORS.green
                            : COLORS.darkBLue
                        }
                      >{`${item.size} ${translations.ml}`}</CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View>
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
                    {translations.Set_Daily_Goal}
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => {
                      setContainerSize(false);
                      setDailyGoal(!dailyGoal);
                    }}
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
                      {selectedDailyGoal} {translations.ml}
                    </CustomText>
                    <CustomIcon
                      Icon={
                        dailyGoal === false
                          ? ICONS.ArrowDownIcon
                          : ICONS.ArrowUpIcon
                      }
                      height={8}
                      width={8}
                    />
                  </TouchableOpacity>
                </View>
                {dailyGoal && (
                  <View style={styles.dailyGoal}>
                    {dailGoalData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectedDailyGoal(item.size);
                          setDailyGoal(false);
                        }}
                      >
                        <CustomText
                          fontSize={12}
                          fontFamily="regular"
                          color={
                            selectedDailyGoal === item.size
                              ? COLORS.green
                              : COLORS.darkBLue
                          }
                        >{`${item.size} ${translations.ml}`}</CustomText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
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
                    {translations.Enable_Water_Reminder}
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
                          backgroundColor:
                            isToggled === true
                              ? COLORS.green
                              : COLORS.lightGrey,
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
                  {translations.Receive_Notification}
                </CustomText>
              </View>
              <PrimaryButton
                title={translations.Save}
                onPress={() => {
                  handleSave();
                }}
                isLoading={isButtonLoading}
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
  sizeMlContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 6,
    alignSelf: "flex-end",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(3),
    position: "absolute",
    backgroundColor: COLORS.white,
    zIndex: 1,
    top: verticalScale(20),
    gap: verticalScale(3),
  },
  dailyGoal: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 6,
    alignSelf: "flex-end",
    paddingHorizontal: horizontalScale(15),
    paddingVertical: verticalScale(3),
    position: "absolute",
    backgroundColor: COLORS.white,
    zIndex: 1,
    top: verticalScale(20),
    gap: verticalScale(3),
  },
});

import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { CustomText } from "../CustomText";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import CustomInput from "../CustomInput";
import PrimaryButton from "../PrimaryButton";
import { KeyboardAvoidingContainer } from "../KeyboardAvoidingComponent";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";

type RecordMealModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  mealType: string;
  mealId: string;
  getNutrition: () => void;
  Mealcarbs?: string;
  Mealfat?: string;
  Mealprotine?: string;
  status?: boolean;
};

const RecordMealModal: FC<RecordMealModalProps> = ({
  isVisible,
  closeModal,
  mealType,
  mealId,
  getNutrition,
  Mealcarbs,
  Mealfat,
  Mealprotine,
  status,
}) => {
  const [activeTab, setActiveTab] = useState<"recordMeal" | "catpureMeal">(
    "recordMeal"
  );
  const [carbs, setCarbs] = useState(Mealcarbs || "");
  const [protine, setProtine] = useState(Mealprotine || "");
  const [fat, setFat] = useState(Mealfat || "");

  const handleMealType = () => {
    if (mealType === "Breakfast") {
      return "first";
    } else if (mealType === "Lunch") {
      return "second";
    } else if (mealType === "Dinner") {
      return "third";
    } else {
      return "other";
    }
  };

  const handleRecordMeal = async () => {
    const data = {
      mealId: mealId,
      finishedMeal: handleMealType(),
      data: {
        carbs: Number(carbs),
        protein: Number(protine),
        fat: Number(fat),
        status: true,
      },
    };

    try {
      const response = await postData(ENDPOINTS.recordMeal, data);
      // console.log(response);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        closeModal();
        getNutrition();
        // handleEmptyInput();
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    if (Mealcarbs && Mealfat && Mealprotine) {
      setCarbs(Mealcarbs);
      setProtine(Mealprotine);
      setFat(Mealfat);
    }
  }, [Mealcarbs, Mealprotine, Mealfat]);

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={() => {
        closeModal();
      }}
      animationType="fade"
    >
      <KeyboardAvoidingContainer>
        <TouchableOpacity
          onPress={() => {
            closeModal();
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
                Record Meal
              </CustomText>
            </View>
            <View
              style={{
                paddingHorizontal: horizontalScale(30),
                gap: verticalScale(15),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: horizontalScale(10),
                  gap: horizontalScale(8),
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab("recordMeal");
                  }}
                  style={[
                    styles.recordBtn,
                    {
                      backgroundColor:
                        activeTab === "recordMeal"
                          ? COLORS.darkBLue
                          : COLORS.white,
                    },
                  ]}
                >
                  <CustomText
                    fontSize={14}
                    fontFamily="regular"
                    color={
                      activeTab === "recordMeal"
                        ? COLORS.white
                        : COLORS.darkBLue
                    }
                  >
                    Record a Meal
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActiveTab("catpureMeal");
                  }}
                  style={[
                    styles.captureBtn,
                    {
                      backgroundColor:
                        activeTab === "catpureMeal"
                          ? COLORS.darkBLue
                          : COLORS.white,
                    },
                  ]}
                >
                  <CustomText
                    fontSize={14}
                    fontFamily="regular"
                    color={
                      activeTab === "catpureMeal"
                        ? COLORS.white
                        : COLORS.darkBLue
                    }
                  >
                    Capture Meal
                  </CustomText>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  gap: verticalScale(6),
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Meal Type
                </CustomText>
                <TouchableOpacity style={styles.typeContainer}>
                  <CustomText
                    fontSize={16}
                    fontFamily="regular"
                    color={COLORS.darkBLue}
                  >
                    {mealType}
                  </CustomText>

                  <CustomIcon
                    Icon={ICONS.DropdownIcon}
                    height={10}
                    width={10}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  gap: verticalScale(6),
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  gms of carbs
                </CustomText>
                <CustomInput
                  onChangeText={setCarbs}
                  value={carbs}
                  inputStyle={{
                    paddingVertical: verticalScale(10),
                  }}
                />
              </View>
              <View
                style={{
                  gap: verticalScale(6),
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  gms of proteins
                </CustomText>
                <CustomInput
                  onChangeText={setProtine}
                  value={protine}
                  inputStyle={{
                    paddingVertical: verticalScale(10),
                  }}
                />
              </View>
              <View
                style={{
                  gap: verticalScale(6),
                }}
              >
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  gms of fat
                </CustomText>
                <CustomInput
                  onChangeText={setFat}
                  value={fat}
                  inputStyle={{
                    paddingVertical: verticalScale(10),
                  }}
                />
              </View>

              <PrimaryButton
                onPress={handleRecordMeal}
                title="Record"
                disabled={status}
              />
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingContainer>
    </Modal>
  );
};

export default RecordMealModal;

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
  recordBtn: {
    backgroundColor: COLORS.darkBLue,
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
  },
  captureBtn: {
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    borderRadius: 10,
    paddingHorizontal: horizontalScale(15),
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderColor: COLORS.greyishWhite,
    borderWidth: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
  },
  selectedTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

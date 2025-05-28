import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { postData } from "../../APIService/api";
import ICONS from "../../Assets/Icons";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, hp, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../CustomIcon";
import CustomInput from "../CustomInput";
import { CustomText } from "../CustomText";
import { KeyboardAvoidingContainer } from "../KeyboardAvoidingComponent";
import PrimaryButton from "../PrimaryButton";

import Toast from "react-native-toast-message";
import ENDPOINTS from "../../APIService/endPoints";
import { GetMacroFromimageApiResponse } from "../../Typings/apiResponse";

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
  initialTab?: "recordMeal" | "catpureMeal";
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
  initialTab = "catpureMeal",
}) => {
  const [activeTab, setActiveTab] = useState<"recordMeal" | "catpureMeal">(
    initialTab
  );
  const [carbs, setCarbs] = useState(Mealcarbs || "");
  const [protine, setProtine] = useState(Mealprotine || "");
  const [fat, setFat] = useState(Mealfat || "");

  const [isType, setIsType] = useState(false);

  // Capture meal states
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiMacros, setApiMacros] = useState<{
    carbs: number;
    protein: number;
    fat: number;
  } | null>(null);
  const [showMacroResults, setShowMacroResults] = useState(false);

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

  // Camera and Gallery functions
  const openCamera = () => {
    const options: CameraOptions = {
      mediaType: "photo",
      quality: 0.8,
      includeBase64: false,
    };

    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorCode) {
        Alert.alert("Error", "Failed to open camera");
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri!);
      }
    });
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        Alert.alert("Error", "Failed to open gallery");
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0].uri!);
      }
    });
  };

  const handleCaptureMeal = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first");
      return;
    }

    setIsUploading(true);
    try {
      const response = await postData<GetMacroFromimageApiResponse>(
        ENDPOINTS.getImageData,
        {
          imageUrl: "https://takethemameal.com/files_images_v2/stam.jpg",
        }
      );

      console.log(response.data.data);

      // Store the API macro data
      if (response.data.data) {
        setApiMacros({
          carbs: response.data.data.carbs,
          protein: response.data.data.protein,
          fat: response.data.data.fat,
        });
        setShowMacroResults(true);

        Toast.show({
          type: "success",
          text1: "Meal analyzed successfully!",
        });
      }
    } catch (error: any) {
      console.log(error, "Error while Uploading Image");

      Toast.show({
        type: "error",
        text1: error.message || "Failed to upload meal image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAcceptApiMacros = async () => {
    if (!apiMacros) return;

    const data = {
      mealId: mealId,
      finishedMeal: handleMealType(),
      data: {
        carbs: apiMacros.carbs,
        protein: apiMacros.protein,
        fat: apiMacros.fat,
        status: true,
      },
    };

    try {
      const response = await postData(ENDPOINTS.recordMeal, data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        closeModal();
        getNutrition();
        resetCaptureState();
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const handleEditMacros = () => {
    if (apiMacros) {
      setCarbs(apiMacros.carbs.toString());
      setProtine(apiMacros.protein.toString());
      setFat(apiMacros.fat.toString());
    }
    setShowMacroResults(false);
    setActiveTab("recordMeal");
  };

  const resetCaptureState = () => {
    setSelectedImage(null);
    setApiMacros(null);
    setShowMacroResults(false);
  };

  const handleRetakePhoto = () => {
    setShowMacroResults(false);
    setApiMacros(null);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (Mealcarbs && Mealfat && Mealprotine) {
      setCarbs(Mealcarbs);
      setProtine(Mealprotine);
      setFat(Mealfat);
    }
  }, [Mealcarbs, Mealprotine, Mealfat]);

  useEffect(() => {
    if (isVisible) {
      setActiveTab(initialTab);
    } else {
      // Reset capture state when modal closes
      resetCaptureState();
    }
  }, [isVisible, initialTab]);

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={() => {
        closeModal();
        setIsType(false);
      }}
      animationType="fade"
    >
      <KeyboardAvoidingContainer>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            setIsType(false);
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

              {/* Record Meal Tab Content */}
              {activeTab === "recordMeal" && (
                <>
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
                    <TouchableOpacity
                      style={styles.typeContainer}
                      onPress={() => {
                        setIsType(!isType);
                      }}
                    >
                      <CustomText
                        fontSize={16}
                        fontFamily="regular"
                        color={COLORS.darkBLue}
                      >
                        {mealType}
                      </CustomText>

                      {/* <CustomIcon
                        Icon={ICONS.DropdownIcon}
                        height={10}
                        width={10}
                      /> */}
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

                  <PrimaryButton onPress={handleRecordMeal} title="Record" />
                </>
              )}

              {/* Capture Meal Tab Content */}
              {activeTab === "catpureMeal" && (
                <>
                  {showMacroResults && apiMacros ? (
                    /* Macro Results Display */
                    <>
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
                          value={apiMacros.carbs.toString()}
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
                          value={apiMacros.protein.toString()}
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
                          value={apiMacros.fat.toString()}
                          inputStyle={{
                            paddingVertical: verticalScale(10),
                          }}
                        />
                      </View>

                      <PrimaryButton
                        onPress={handleAcceptApiMacros}
                        title="Accept & Record"
                      />

                      <TouchableOpacity
                        style={styles.retakeButton}
                        onPress={handleRetakePhoto}
                      >
                        <CustomText
                          fontSize={14}
                          fontFamily="regular"
                          color={COLORS.darkBLue}
                        >
                          Retake Photo
                        </CustomText>
                      </TouchableOpacity>
                    </>
                  ) : (
                    /* Image Selection Area */
                    <>
                      <View
                        style={{
                          gap: verticalScale(15),
                          alignItems: "center",
                        }}
                      >
                        {selectedImage ? (
                          <View style={styles.imagePreviewContainer}>
                            <Image
                              source={{ uri: selectedImage }}
                              style={styles.imagePreview}
                              resizeMode="cover"
                            />
                            <TouchableOpacity
                              style={styles.removeImageBtn}
                              onPress={() => setSelectedImage(null)}
                            >
                              <CustomIcon Icon={ICONS.DeleteIcon} />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={styles.imageOptionsContainer}>
                            <TouchableOpacity
                              style={styles.imageOptionBtn}
                              onPress={openCamera}
                            >
                              <CustomIcon
                                Icon={ICONS.cameraIcon}
                                height={30}
                                width={30}
                              />
                              <CustomText
                                fontSize={16}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                              >
                                Take Photo
                              </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.imageOptionBtn}
                              onPress={openGallery}
                            >
                              <CustomIcon
                                Icon={ICONS.galleryIcon}
                                height={30}
                                width={30}
                              />
                              <CustomText
                                fontSize={16}
                                fontFamily="medium"
                                color={COLORS.darkBLue}
                              >
                                Choose Gallery
                              </CustomText>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>

                      <PrimaryButton
                        onPress={handleCaptureMeal}
                        title={"Analyze Meal"}
                        disabled={!selectedImage || isUploading}
                        isLoading={isUploading}
                      />
                    </>
                  )}
                </>
              )}
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
  imagePreviewContainer: {
    position: "relative",
    width: "100%",
    height: hp(30),
    borderRadius: 12,
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageBtn: {
    position: "absolute",
    top: verticalScale(10),
    right: horizontalScale(10),
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: verticalScale(5),
  },
  imageOptionsContainer: {
    width: "100%",
    gap: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
  },
  imageOptionBtn: {
    flex: 1,
    alignItems: "center",
    gap: horizontalScale(15),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    backgroundColor: COLORS.darkGreenGradient.start,
    borderRadius: 12,
  },
  macroResultsContainer: {
    backgroundColor: COLORS.greyishWhite,
    borderRadius: 12,
    padding: horizontalScale(20),
    marginVertical: verticalScale(10),
  },
  macroGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  macroItem: {
    alignItems: "center",
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  actionButtonsContainer: {
    gap: horizontalScale(10),
    alignItems: "center",
    backgroundColor: "red",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkBLue,
    borderRadius: 12,
    paddingVertical: verticalScale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  retakeButton: {
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
});

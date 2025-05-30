import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Asset,
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { postData, postFormData } from "../../APIService/api";
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
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Linking } from "react-native";

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
  isPlan?: string;
  refreshData: () => void;
  isPlanActive?: boolean; // Add this prop
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
  isPlan,
  refreshData,
  isPlanActive = false, // Default to false
}) => {
  const [activeTab, setActiveTab] = useState<"recordMeal" | "catpureMeal">(
    initialTab
  );
  const [carbs, setCarbs] = useState(Mealcarbs || "");
  const [protine, setProtine] = useState(Mealprotine || "");
  const [fat, setFat] = useState(Mealfat || "");
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [isType, setIsType] = useState(false);

  // Capture meal states
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiMacros, setApiMacros] = useState<{
    carbs: number;
    protein: number;
    fat: number;
    microNutrients: any;
  } | null>(null);
  const [showMacroResults, setShowMacroResults] = useState(false);

  // Add this state for dropdown visibility
  const [showMealTypeDropdown, setShowMealTypeDropdown] = useState(false);
  const [captureTabMealType, setCaptureTabMealType] = useState(
    mealType || "Breakfast"
  );
  const [mealTypeSelected, setMealTypeSelected] = useState(false);

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
    setIsButtonLoading(true);

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
    } finally {
      setIsButtonLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const permission =
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        return true;
      }

      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      }

      if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
        Alert.alert(
          "Camera Permission",
          "Camera permission is required to take photos. Please enable it in your device settings.",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return false;
      }

      return false;
    } catch (error) {
      console.log("Error checking camera permission:", error);
      return false;
    }
  };

  // Camera and Gallery functions
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      return;
    }

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
        setSelectedImage(response.assets[0]!);
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
        setSelectedImage(response.assets[0]!);
      }
    });
  };

  const handleCaptureMeal = async () => {
    if (!selectedImage) {
      Alert.alert("Error", "Please select an image first");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });
    try {
      const response = await postFormData<GetMacroFromimageApiResponse>(
        ENDPOINTS.getImageData,
        formData
      );
      // Store the API macro data
      if (response.data.data) {
        setApiMacros({
          carbs: response.data.data.carbs,
          protein: response.data.data.protein,
          fat: response.data.data.fat,
          microNutrients: response.data.data.microNutrients,
        });
        setShowMacroResults(true);
        Toast.show({
          type: "success",
          text1: "Meal analyzed successfully!",
        });
      }
    } catch (error: any) {
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

    const mealTypeValue =
      activeTab === "catpureMeal"
        ? handleMealTypeValue(captureTabMealType)
        : handleMealType();

    const data = {
      mealId: mealId,
      finishedMeal: mealTypeValue,
      data: {
        carbs: apiMacros.carbs,
        protein: apiMacros.protein,
        fat: apiMacros.fat,
        status: true,
      },
    };

    if (apiMacros.microNutrients) {
      data.data = { ...data.data, microNutrients: apiMacros.microNutrients };
    }

    try {
      const response = await postData(ENDPOINTS.recordMeal, data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        closeModal();
        getNutrition && getNutrition();
        resetCaptureState();
        refreshData();
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  // const handleEditMacros = () => {
  //   if (apiMacros) {
  //     setCarbs(apiMacros.carbs.toString());
  //     setProtine(apiMacros.protein.toString());
  //     setFat(apiMacros.fat.toString());
  //   }
  //   setShowMacroResults(false);
  //   setActiveTab("recordMeal");
  // };

  const resetCaptureState = () => {
    setSelectedImage(null);
    setApiMacros(null);
    setShowMacroResults(false);
    setMealTypeSelected(false);
    setCaptureTabMealType(mealType || "Breakfast");
  };

  const handleRetakePhoto = () => {
    setShowMacroResults(false);
    setApiMacros(null);
    setSelectedImage(null);
  };

  const handleCaptureTabMealTypeSelect = (type: string) => {
    setCaptureTabMealType(type);
    setShowMealTypeDropdown(false);
    setMealTypeSelected(true);
  };

  const handleMealTypeValue = (type: string) => {
    if (type === "Breakfast") {
      return "first";
    } else if (type === "Lunch") {
      return "second";
    } else if (type === "Dinner") {
      return "third";
    } else {
      return "other";
    }
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
      // If user doesn't have an active plan, force "recordMeal" tab
      setActiveTab(isPlanActive ? initialTab : "recordMeal");
    } else {
      // Reset capture state when modal closes
      resetCaptureState();
    }
  }, [isVisible, initialTab, isPlanActive]);

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
                {isPlanActive && ( // Only show Capture Meal tab if user has active plan
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
                )}
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

                  <PrimaryButton
                    onPress={handleRecordMeal}
                    title="Record"
                    isLoading={isButtonLoading}
                  />
                </>
              )}

              {/* Capture Meal Tab Content */}

              {activeTab === "catpureMeal" && (
                <>
                  {showMacroResults && apiMacros ? (
                    /* Macro Results Display */
                    <>
                      <View style={{ gap: verticalScale(6) }}>
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
                          inputStyle={{ paddingVertical: verticalScale(10) }}
                        />
                      </View>
                      {/* Other macro input fields... */}
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
                    /* Image Selection Area with Meal Type Dropdown */
                    <>
                      <View style={{ gap: verticalScale(15) }}>
                        <View style={{ gap: verticalScale(6) }}>
                          <CustomText
                            fontSize={12}
                            fontFamily="regular"
                            color={COLORS.darkBLue}
                          >
                            Meal Type
                          </CustomText>
                          <TouchableOpacity
                            style={styles.typeContainer}
                            onPress={() =>
                              setShowMealTypeDropdown(!showMealTypeDropdown)
                            }
                          >
                            <CustomText
                              fontSize={16}
                              fontFamily="regular"
                              color={COLORS.darkBLue}
                            >
                              {captureTabMealType}
                            </CustomText>
                            <CustomIcon
                              Icon={ICONS.DropdownIcon}
                              height={10}
                              width={10}
                            />
                          </TouchableOpacity>
                        </View>

                        {showMealTypeDropdown && (
                          <View style={styles.dropdownContainer}>
                            {["Breakfast", "Lunch", "Dinner", "Other"].map(
                              (type) => (
                                <TouchableOpacity
                                  key={type}
                                  style={styles.dropdownItem}
                                  onPress={() =>
                                    handleCaptureTabMealTypeSelect(type)
                                  }
                                >
                                  <CustomText
                                    fontSize={16}
                                    fontFamily="regular"
                                    color={COLORS.darkBLue}
                                  >
                                    {type}
                                  </CustomText>
                                </TouchableOpacity>
                              )
                            )}
                          </View>
                        )}
                      </View>

                      <View
                        style={{ gap: verticalScale(15), alignItems: "center" }}
                      >
                        {selectedImage ? (
                          <View style={styles.imagePreviewContainer}>
                            <Image
                              source={{ uri: selectedImage.uri }}
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
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    marginTop: -10,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyishWhite,
  },
  backButton: {
    paddingVertical: verticalScale(12),
    // paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});

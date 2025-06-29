import {
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import { EditProfileScreenProps } from "../../Typings/route";
import { ScrollView } from "react-native-gesture-handler";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomInput from "../../Components/CustomInput";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import { setProfileForm } from "../../Redux/slices/questionSlice";
import PrimaryButton from "../../Components/PrimaryButton";
import dayjs from "dayjs";
import UploadImageOptions from "../../Components/Modals/UploadImageOption";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { callingCodeToCountryCode } from "../../Utilities/Helpers";
import Toast from "react-native-toast-message";
import { postData, postFormData, putData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { IMAGE_BASE_URL } from "@env";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useLanguage } from "../../Context/LanguageContext";
import IMAGES from "../../Assets/Images";

type ProfileForm = {
  gender: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
};

// Function to add ordinal suffix
function getOrdinalSuffix(day: any) {
  if (day > 3 && day < 21) return "th"; // 4th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const EditProfile: FC<EditProfileScreenProps> = ({ navigation, route }) => {
  const { userData } = route.params;
  const dispatch = useAppDispatch();

  const { translations } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const { profileForm } = useAppSelector((state) => state.questions);
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [country, setCountry] = useState<Country | null>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
  };

  const handleProfileChange = (field: keyof ProfileForm) => (value: string) => {
    dispatch(setProfileForm({ [field]: value }));
  };

  const bmi = useMemo(() => {
    const heightCm = parseFloat(profileForm.height);
    const weightLbs = parseFloat(profileForm.weight);
    if (
      !isNaN(heightCm) &&
      !isNaN(weightLbs) &&
      heightCm > 0 &&
      weightLbs > 0
    ) {
      const heightM = heightCm / 100; // Convert cm to meters
      const weightKg = weightLbs * 0.453592; // Convert lbs to kg
      const bmiValue = weightKg / (heightM * heightM);
      return bmiValue.toFixed(1); // Round to 1 decimal place
    }
    return "";
  }, [profileForm.height, profileForm.weight]);

  const closeModal = () => {
    setModalVisible(false);
  };

  // Permission for camera

  const requestCameraPermission = async () => {
    try {
      const permission =
        Platform.OS === "ios" ? PERMISSIONS.IOS : PERMISSIONS.ANDROID.CAMERA;

      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        return true;
      }

      if (result == RESULTS.DENIED) {
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
    } catch (error) {
      console.log("Error checking camera permission:", error);
      return false;
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      return;
    }

    const options: CameraOptions = {
      mediaType: "photo",
      quality: 0.1,
      saveToPhotos: true, // Save to gallery
    };
    launchCamera(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorCode) {
        console.log("camera open error");
      } else if (response.assets && response.assets.length > 0) {
        closeModal();
        setSelectedImage(response.assets[0]?.uri!);
        const formData = new FormData();
        const asset = response.assets[0];
        formData.append("image", {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        });
        try {
          const response = await postFormData(
            ENDPOINTS.updateProfilPic,
            formData
          );
          console.log(response.data, "yyyy");
        } catch (error: any) {
          Toast.show({
            type: "error",
            text1: error.message || "Something went wrong",
          });
        }
      }
    });
  };

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 0.1,
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("image picker error");
      } else if (response.assets && response.assets.length > 0) {
        closeModal();
        setSelectedImage(response.assets[0]?.uri!);
        const formData = new FormData();
        const asset = response.assets[0];
        formData.append("image", {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        });
        try {
          const response = await postFormData(
            ENDPOINTS.updateProfilPic,
            formData
          );

          console.log(response.data, "SSSS");
        } catch (error: any) {
          Toast.show({
            type: "error",
            text1: error.message || "Something went wrong",
          });
        }
      }
    });
  };

  const userUpdateData = async () => {
    const data = {
      gender: profileForm.gender,
      dob: profileForm.dob,
      age: Number(profileForm.age),
      height: Number(profileForm.height),
      weight: Number(profileForm.weight),
      bmi: Number(bmi),
    };
    setIsButtonLoading(true);
    // console.log("update data", data);

    try {
      const response = await putData(ENDPOINTS.updateUserProfile, data);
      // console.log("update data ----->", response);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        navigation.replace("tabs", {
          screen: "settings",
        });
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

  useEffect(() => {
    if (profileForm.dob) {
      // Remove ordinal suffixes (st, nd, rd, th)
      const normalizedDateStr = profileForm.dob.replace(
        /(\d{1,2})(st|nd|rd|th)/,
        "$1"
      );

      // Ensure day is two digits
      const formattedDateStr = normalizedDateStr.replace(/^(\d)(?=\s)/, "0$1");
      const birthDate = dayjs(formattedDateStr, "DD MMM YYYY");
      if (birthDate.isValid()) {
        const today = dayjs();
        const age = today.diff(birthDate, "year");
        dispatch(setProfileForm({ age: age.toString() }));
      }
    }
  }, [profileForm.dob, dispatch]);

  useEffect(() => {
    const parsedDate = dayjs(userData?.dob, "MM-DD-YYYY");
    const day = parsedDate.date();
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${parsedDate.format(
      "MMM YYYY"
    )}`;

    console.log(callingCodeToCountryCode(userData?.countryCode));

    setName(userData?.fullName!);
    setEmail(userData?.email!);
    setPhone(userData?.phoneNumber!);
    setCountryCode(callingCodeToCountryCode(userData?.countryCode));
    dispatch(
      setProfileForm({
        gender: userData?.gender,
        dob: userData?.dob,
        height: userData?.height?.toLocaleString(),
        weight: userData?.weight?.toLocaleString(),
      })
    );
  }, [userData]);

  console.log("selected image ", selectedImage);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.edit_profile}
          </CustomText>
        </View>

        <View style={{ gap: verticalScale(20) }}>
          <TouchableOpacity style={styles.circleView}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.userImg} />
            ) : (
              <Image
                source={{ uri: IMAGE_BASE_URL + userData?.profilePic }}
                style={styles.userImg}
              />
            )}

            <View style={styles.penContainer}>
              <TouchableOpacity
                style={styles.penBtn}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <CustomIcon Icon={ICONS.whitePenIcon} height={12} width={12} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={{ gap: verticalScale(10) }}>
            <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
              {translations.personal_details}
            </CustomText>
            <View style={{ gap: verticalScale(10) }}>
              <CustomInput
                label={translations.full_name}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                disabled={true}
              />
              <CustomInput
                label={translations.email_address}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                disabled={true}
              />

              <View style={{ gap: verticalScale(5) }}>
                <CustomText fontSize={12} color={COLORS.oldGrey}>
                  {translations.phone_number}
                </CustomText>
                <View style={styles.phoneInputContainer}>
                  <View style={styles.countryPickerContainer}>
                    {/* Display flag emoji based on country code */}

                    {countryCode ? (
                      <CustomText
                        fontSize={20}
                        color={COLORS.oldGrey}
                        fontFamily="regular"
                      >
                        {getFlagEmoji(countryCode)}
                      </CustomText>
                    ) : (
                      <CustomText
                        fontSize={12}
                        color={COLORS.oldGrey}
                        fontFamily="regular"
                      >
                        Not selected
                      </CustomText>
                    )}
                  </View>
                  <View style={styles.numberWithCallingContainer}>
                    <CustomText fontSize={14} color={COLORS.oldGrey}>
                      {`${country ? `(${country?.callingCode})` : ""}`}
                    </CustomText>
                    <TextInput
                      onChangeText={setPhone}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#D1D4D8"
                      style={styles.inputStyle}
                      keyboardType="number-pad"
                      value={phone}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
            {translations.Other_details}
          </CustomText>

          <KeyboardAvoidingContainer
            style={{
              justifyContent: "space-between",
              gap: verticalScale(20),
            }}
          >
            <View style={styles.optionsContainer}>
              <CustomInput
                label={translations.select_gender}
                type="dropdown"
                placeholder="Gender"
                value={profileForm.gender}
                onChangeText={handleProfileChange("gender")}
                options={GENDER_OPTIONS}
                accessibilityLabel="Select gender"
              />
              <View style={styles.inputRow}>
                <CustomInput
                  label={translations.date_of_birth}
                  type="date"
                  placeholder="Select"
                  value={profileForm.dob}
                  onChangeText={handleProfileChange("dob")}
                  baseStyle={styles.dateInput}
                  maxDate={new Date()}
                  accessibilityLabel="Select date of birth"
                />
                <CustomInput
                  label={translations.age}
                  placeholder="Age"
                  value={profileForm.age}
                  onChangeText={handleProfileChange("age")}
                  baseStyle={styles.ageInput}
                  disabled
                  editable={false}
                />
              </View>
              <View style={styles.inputRow}>
                <CustomInput
                  label={translations.height}
                  type="number"
                  placeholder="180 cm"
                  value={profileForm.height}
                  onChangeText={handleProfileChange("height")}
                  baseStyle={styles.heightInput}
                  accessibilityLabel="Enter height"
                />
                <CustomInput
                  label={translations.weight}
                  type="number"
                  placeholder="180 lbs"
                  value={profileForm.weight}
                  onChangeText={handleProfileChange("weight")}
                  baseStyle={styles.weightInput}
                  accessibilityLabel="Enter weight"
                />
              </View>
              {bmi && (
                <CustomInput
                  label={translations.bmi}
                  type="text"
                  value={bmi}
                  onChangeText={() => {}}
                  disabled
                />
              )}
            </View>
            <PrimaryButton
              title={translations.save_details}
              onPress={userUpdateData}
              isLoading={isButtonLoading}
            />
          </KeyboardAvoidingContainer>
        </View>

        <UploadImageOptions
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          onPressCamera={openCamera}
          title="Select your options"
          onPressGallery={openGallery}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  circleView: {
    borderWidth: 1,
    height: hp(14.5),
    width: hp(14.5),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.green,
    alignSelf: "center",
  },
  userImg: {
    height: hp(13.7),
    width: hp(13.7),
    resizeMode: "cover",
    borderRadius: 100,
  },
  penBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(6),
    borderRadius: 30,
  },
  penContainer: {
    position: "absolute",
    right: 1,
    bottom: 5,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(1.3),
    paddingHorizontal: horizontalScale(1.3),
    borderRadius: 30,
  },
  phoneInputContainer: {
    borderWidth: 1.5,
    borderColor: COLORS.greyishWhite,
    borderRadius: 8,
    flexDirection: "row",
    gap: horizontalScale(5),

    backgroundColor: COLORS.greyishWhite,
  },
  countryPickerContainer: {
    borderEndWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    flexDirection: "row",
    borderColor: COLORS.white,
  },
  numberWithCallingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: verticalScale(15),
    marginRight: horizontalScale(5),
    color: COLORS.darkBLue,
  },
  optionsContainer: {
    width: "100%",
    gap: verticalScale(15),
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: horizontalScale(10),
  },
  dateInput: {
    flex: 0.7,
  },
  ageInput: {
    flex: 0.3,
  },
  heightInput: {
    flex: 1,
  },
  weightInput: {
    flex: 1,
  },
  bmiContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
    marginTop: verticalScale(10),
  },
});

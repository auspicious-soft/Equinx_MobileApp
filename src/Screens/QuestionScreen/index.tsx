import React, { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import PrimaryButton from "../../Components/PrimaryButton";
import QueastionResponse from "../../Seeds/QuestionAPIData";
import { QuestionScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

type ProfileForm = {
  gender: string;
  dob: string;
  age: string;
  height: string;
  weight: string;
};

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const QuestionScreen: FC<QuestionScreenProps> = ({ navigation, route }) => {
  const { questionId, totalQuestions } = route.params;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    gender: "",
    dob: "",
    age: "",
    height: "",
    weight: "",
  });

  const [weightGoal, setWeightGoal] = useState("");

  const [firstMmealTime, setFirstMealTime] = useState<any>(null);
  const [lastMealTime, setLastMealTime] = useState<any>(null);

  const [selectedTime, setSelectedTime] = useState<Date>(new Date()); // State to hold the Date object from picker

  const questionData = QueastionResponse.data.questions[questionId];

  // Calculate BMI
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

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (isMultiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  // Handle profile form input changes
  const handleProfileChange = (field: keyof ProfileForm) => (value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  // Check if an option is selected
  const isOptionSelected = (optionId: string) =>
    selectedOptions.includes(optionId);

  // Validate profile form
  const isProfileValid = useMemo(() => {
    const { gender, dob, age, height, weight } = profileForm;
    return (
      gender.trim() !== "" &&
      dob.trim() !== "" &&
      age.trim() !== "" &&
      parseInt(age) > 0 &&
      height.trim() !== "" &&
      parseFloat(height) > 0 &&
      weight.trim() !== "" &&
      parseFloat(weight) > 0
    );
  }, [profileForm]);

  // Handle next button press
  const handleNext = () => {
    if (questionData.next === "question") {
      navigation.navigate("questionScreen", {
        questionId: questionId + 1,
        totalQuestions,
      });
    } else if (questionData.next.startsWith("info")) {
      const index = parseInt(questionData.next.replace("info", ""), 10);

      navigation.navigate("infoScreen", {
        index,
        nextQuestion: questionId + 1,
      });
      return;
    } else if (questionData.next === "planScreen") {
      navigation.navigate("planScreen");
    }
  };

  // Handle back button press
  const handleBack = () => {
    if (questionId > 0) {
      navigation.navigate("questionScreen", {
        questionId: questionId - 1,
        totalQuestions,
      });
    } else {
      navigation.goBack();
    }
  };

  const handleFirstMealTimeChange = (date: Date) => {
    setSelectedTime(date);
    const formattedTime = dayjs(date).format("hh:mm A");
    setFirstMealTime(formattedTime);
  };

  const handleLastMealTimeChange = (date: Date) => {
    setSelectedTime(date);
    const formattedTime = dayjs(date).format("hh:mm A");
    setLastMealTime(formattedTime);
  };

  // Validate questionData
  useEffect(() => {
    if (!questionData) {
      navigation.goBack();
      return;
    }
    setIsMultiSelect(questionData.text.toLowerCase().includes("multi-select"));
    setSelectedOptions([]);
  }, [questionId, questionData, navigation]);

  if (!questionData) {
    return null; // Or a fallback UI
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View
          style={[
            styles.header,
            {
              justifyContent: questionId === 0 ? "flex-end" : "space-between",
              paddingVertical: questionId === 0 ? horizontalScale(10) : 0,
            },
          ]}
        >
          {questionId > 0 && (
            <TouchableOpacity
              onPress={handleBack}
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <CustomIcon Icon={ICONS.BackArrow} height={30} width={30} />
            </TouchableOpacity>
          )}
          <CustomText color={COLORS.oldGrey}>
            {questionData.order < 10
              ? `0${questionData.order}`
              : questionData.order}{" "}
            / {totalQuestions}
          </CustomText>
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.questionTextContainer}>
            <CustomText
              fontSize={22}
              fontFamily="bold"
              style={styles.questionText}
            >
              {questionData.text}
            </CustomText>
            {questionData.subtitle && (
              <CustomText fontSize={12} style={styles.subtitleText}>
                {questionData.subtitle}
              </CustomText>
            )}
          </View>

          {questionData.type === "mcq" && (
            <View
              style={{
                justifyContent: "space-between",
                gap: verticalScale(20),
              }}
            >
              <View
                style={[
                  styles.optionsContainer,
                  questionData.options.length > 5 && {
                    flexWrap: "wrap",
                    flexDirection: "row",
                  },
                ]}
              >
                {questionData.options.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionItem,
                      isOptionSelected(option.value.toString()) &&
                        styles.selectedOption,
                      questionData.options.length > 5 && {
                        flex: 0.4,
                        marginHorizontal: horizontalScale(5),
                        gap: horizontalScale(10),
                      },
                    ]}
                    onPress={() => handleOptionSelect(option.value.toString())}
                    activeOpacity={0.7}
                  >
                    <CustomText
                      fontSize={14}
                      style={styles.optionText}
                      color={COLORS.darkBLue}
                    >
                      {option.text}
                    </CustomText>
                    {questionData.options.length <= 5 &&
                      isOptionSelected(option.value.toString()) && (
                        <CustomIcon
                          Icon={ICONS.WhiteTickwithBlueBg}
                          height={20}
                          width={20}
                        />
                      )}
                  </TouchableOpacity>
                ))}
              </View>
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={selectedOptions.length === 0}
              />
            </View>
          )}

          {questionData.type === "profile" && (
            <KeyboardAvoidingContainer
              style={{
                justifyContent: "space-between",
                gap: verticalScale(20),
              }}
            >
              <View style={styles.optionsContainer}>
                <CustomInput
                  label="Select your gender"
                  type="dropdown"
                  placeholder="Gender"
                  value={profileForm.gender}
                  onChangeText={handleProfileChange("gender")}
                  options={GENDER_OPTIONS}
                  accessibilityLabel="Select gender"
                />
                <View style={styles.inputRow}>
                  <CustomInput
                    label="Date of Birth"
                    type="date"
                    placeholder="Select"
                    value={profileForm.dob}
                    onChangeText={handleProfileChange("dob")}
                    baseStyle={styles.dateInput}
                    accessibilityLabel="Select date of birth"
                  />
                  <CustomInput
                    label="Age"
                    type="number"
                    placeholder="Age"
                    value={profileForm.age}
                    onChangeText={handleProfileChange("age")}
                    baseStyle={styles.ageInput}
                    accessibilityLabel="Enter age"
                  />
                </View>
                <View style={styles.inputRow}>
                  <CustomInput
                    label="Height"
                    type="number"
                    placeholder="180 cm"
                    value={profileForm.height}
                    onChangeText={handleProfileChange("height")}
                    baseStyle={styles.heightInput}
                    accessibilityLabel="Enter height"
                  />
                  <CustomInput
                    label="Weight"
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
                    label="Your BMI is"
                    type="text"
                    value={bmi}
                    onChangeText={() => {}}
                    disabled
                  />
                )}
              </View>
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={!isProfileValid}
              />
            </KeyboardAvoidingContainer>
          )}

          {questionData.type === "multiSelect" && (
            <View
              style={{
                gap: verticalScale(20),
              }}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    flexWrap: "wrap",
                    rowGap: verticalScale(10),
                  },
                ]}
              >
                {questionData.options.map((option) => {
                  return (
                    <TouchableOpacity
                      key={option.value}
                      onPress={() =>
                        handleOptionSelect(option.value.toString())
                      }
                      style={[
                        styles.optionItem,
                        isOptionSelected(option.value.toString()) &&
                          styles.selectedOption,
                        questionData.options.length > 5 && {
                          marginHorizontal: horizontalScale(5),
                          gap: horizontalScale(10),
                        },
                      ]}
                    >
                      <CustomText fontSize={14} color={COLORS.darkBLue}>
                        {option.text}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={selectedOptions.length === 0}
              />
            </View>
          )}

          {questionData.type === "time1" && (
            <View style={{ alignItems: "center" }}>
              <DatePicker
                mode="time"
                date={selectedTime}
                onDateChange={handleFirstMealTimeChange}
                is24hourSource="locale"
              />
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={!firstMmealTime}
              />
            </View>
          )}

          {questionData.type === "time2" && (
            <View style={{ alignItems: "center" }}>
              <DatePicker
                mode="time"
                date={selectedTime}
                onDateChange={handleLastMealTimeChange}
                is24hourSource="locale"
              />
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={!lastMealTime}
              />
            </View>
          )}

          {questionData.type === "number" && (
            <View style={{ gap: verticalScale(10) }}>
              <CustomInput
                label="Weight"
                type="number"
                placeholder="180 lbs"
                value={weightGoal}
                onChangeText={setWeightGoal}
                accessibilityLabel="Enter height"
                autoFocus
              />
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={!weightGoal}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default QuestionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: horizontalScale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: horizontalScale(5),
  },
  questionContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  questionTextContainer: {
    marginVertical: verticalScale(20),
    gap: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  questionText: {
    textAlign: "center",
  },
  subtitleText: {
    textAlign: "center",
  },
  mcqContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  profileContainer: {
    flex: 1,
    justifyContent: "space-between",
    gap: verticalScale(30),
  },
  optionsContainer: {
    width: "100%",
    gap: verticalScale(20),
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    backgroundColor: COLORS.white,
  },
  selectedOption: {
    backgroundColor: COLORS.greyishWhite,
    borderColor: COLORS.green,
  },
  optionText: {
    flex: 1,
  },
  wrapOptions: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: horizontalScale(10),
  },
  wrapOptionItem: {
    flex: 0.45,
    marginHorizontal: horizontalScale(5),
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

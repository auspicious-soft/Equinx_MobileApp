import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import React, { FC, useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import CustomInput from "../../Components/CustomInput";
import { CustomText } from "../../Components/CustomText";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import PrimaryButton from "../../Components/PrimaryButton";
import {
  setCurrentQuestionId,
  setFirstMealTime,
  setLastMealTime,
  setProfileForm,
  setQuestionAnswer,
  setSelectedOptions,
  setWeightGoal,
} from "../../Redux/slices/questionSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import QueastionResponse from "../../Seeds/QuestionAPIData";
import { QuestionScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";

dayjs.extend(customParseFormat);

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

  const dispatch = useAppDispatch();
  const {
    selectedOptions,
    questionAnswers,
    profileForm,
    weightGoal,
    firstMmealTime,
    lastMealTime,
  } = useAppSelector((state) => state.questions);

  const [isMultiSelect, setIsMultiSelect] = useState(false);

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

  // Handle option selection with limit of 5
  const handleOptionSelect = (optionId: string) => {
    if (isMultiSelect) {
      // For multi-select questions, limit to 5 selections
      if (
        questionData.text ===
        "How would you describe your eating habits? (Multi-select)"
      ) {
        if (
          selectedOptions.length >= 3 &&
          !selectedOptions.includes(optionId)
        ) {
          return;
        }
      } else {
        if (
          selectedOptions.length >= 5 &&
          !selectedOptions.includes(optionId)
        ) {
          return;
        }
      }
      const newOptions = selectedOptions.includes(optionId)
        ? selectedOptions.filter((id) => id !== optionId)
        : [...selectedOptions, optionId];

      // Update both the current selection and store it by question ID
      dispatch(setSelectedOptions(newOptions));
      dispatch(setQuestionAnswer({ questionId, answers: newOptions }));
    } else {
      // For single-select questions
      const newOptions = [optionId];
      dispatch(setSelectedOptions(newOptions));
      dispatch(setQuestionAnswer({ questionId, answers: newOptions }));
    }
  };

  // Handle profile form input changes
  const handleProfileChange = (field: keyof ProfileForm) => (value: string) => {
    dispatch(setProfileForm({ [field]: value }));
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

  // Validate questionData, set multi-select, and load saved answers
  useEffect(() => {
    if (!questionData) {
      navigation.goBack();
      return;
    }

    // Set the current question ID in Redux
    dispatch(setCurrentQuestionId(questionId));

    // Determine if this is a multi-select question
    const isMulti =
      questionData.text.toLowerCase().includes("multi-select") ||
      questionData.type === "multiSelect";
    setIsMultiSelect(isMulti);

    // Load previously saved answers for this question if they exist
    if (questionAnswers[questionId]) {
      dispatch(setSelectedOptions(questionAnswers[questionId]));
    } else {
      // Reset selected options if no saved answers
      dispatch(setSelectedOptions([]));
    }
  }, [questionId, questionData, navigation, dispatch, questionAnswers]);

  // Update age based on DOB
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

  if (!questionData) {
    return null; // Or a fallback UI
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          {questionId > 0 && (
            <TouchableOpacity
              onPress={handleBack}
              accessibilityLabel="Go back"
              style={styles.backButton}
            >
              <CustomIcon Icon={ICONS.BackArrow} height={30} width={30} />
            </TouchableOpacity>
          )}
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
                    {option.hasIcon && (
                      <View
                        style={{
                          marginRight: horizontalScale(10),
                          backgroundColor: isOptionSelected(
                            option.value.toString()
                          )
                            ? COLORS.white
                            : COLORS.greyishWhite,
                          borderRadius: 100,
                          width: verticalScale(26),
                          height: verticalScale(26),
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CustomIcon
                          Icon={
                            ICONS[
                              `Mcq${option.value.toString()}` as keyof typeof ICONS
                            ]
                          }
                          height={16}
                          width={16}
                        />
                      </View>
                    )}
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
                    maxDate={new Date()}
                    accessibilityLabel="Select date of birth"
                  />
                  <CustomInput
                    label="Age"
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

          {questionData.type === "mealTimes" && (
            <View style={{ gap: verticalScale(20) }}>
              <View style={styles.optionsContainer}>
                <CustomInput
                  label="First Meal"
                  type="time"
                  placeholder="Select time"
                  value={firstMmealTime}
                  onChangeText={(value) => dispatch(setFirstMealTime(value))}
                />
                <CustomInput
                  label="Last Meal"
                  type="time"
                  placeholder="Select time"
                  value={lastMealTime}
                  onChangeText={(value) => dispatch(setLastMealTime(value))}
                />
              </View>
              <PrimaryButton
                title="Next"
                onPress={handleNext}
                disabled={!firstMmealTime || !lastMealTime}
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
                onChangeText={(value) => dispatch(setWeightGoal(value))}
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
    justifyContent: "flex-start",
    minHeight: verticalScale(40),
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
    gap: verticalScale(15),
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

import React, { FC, useEffect, useState } from "react";
import { Animated, Easing, View } from "react-native";
import DeviceInfo from "react-native-device-info";
import LinearGradient from "react-native-linear-gradient";
import { fetchData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import {
  setQuestionAnswer,
  setQuestionsData,
} from "../../Redux/slices/questionSlice";
import { useAppDispatch } from "../../Redux/store";
import { GetQuestionDataResponse } from "../../Typings/apiResponse";
import { SplashProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import STORAGE_KEYS from "../../Utilities/Constants";
import { verticalScale } from "../../Utilities/Metrics";
import { getLocalStorageData } from "../../Utilities/Storage";
import styles from "./styles";

const Splash: FC<SplashProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const [token, setToken] = useState(null);

  const [isOnBoarded, setIsOnBoarded] = useState(false);

  const getToken = async () => {
    const token = await getLocalStorageData(STORAGE_KEYS.token);
    if (token) {
      setToken(token);
    }
  };

  const getQuestionsData = async () => {
    const deviceUniqueId = await DeviceInfo.getUniqueId();
    const response = await fetchData<GetQuestionDataResponse>(
      `${ENDPOINTS.questions}/${deviceUniqueId}`
    );

    if (response.data.success) {
      dispatch(setQuestionsData(response.data.data.questions));

      // Save previous answers if they exist
      if (response.data.data.questionResponse) {
        response.data.data.questionResponse.forEach((answer) => {
          // Convert the selectedOptionValues to strings as expected by Redux
          const answerValues = Array.isArray(answer.selectedOptionValues)
            ? answer.selectedOptionValues.map((val) =>
                typeof val === "object" ? JSON.stringify(val) : val.toString()
              )
            : [];

          dispatch(
            setQuestionAnswer({
              questionId: answer.questionId,
              answers: answerValues,
              order: answer.order,
            })
          );
        });
      }

      if (
        response.data.data.questionResponse.length ===
        response.data.data.questions.length
      ) {
        setIsOnBoarded(true);
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (!token) {
      getQuestionsData();
    }
  }, [token]);

  console.log(isOnBoarded);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second for fade in
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Navigate after 3 seconds total (1s fade-in + 1s visible + 1s fade-out)
    const timeout = setTimeout(() => {
      // Fade out animation before navigating
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 second for fade out
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(async () => {
        if (token) {
          navigation.replace("mainStack", {
            screen: "tabs",
            params: {
              screen: "home",
            },
          });
        } else {
          try {
            // Get questions data to find the first question
            const deviceUniqueId = await DeviceInfo.getUniqueId();
            const response = await fetchData<GetQuestionDataResponse>(
              `${ENDPOINTS.questions}/${deviceUniqueId}`
            );

            if (
              response.data.success &&
              response.data.data.questions.length > 0
            ) {
              // Find the first question by order
              const firstQuestion = response.data.data.questions.find(
                (q) => q.order === 1
              );

              if (isOnBoarded) {
                navigation.replace("authStack", {
                  screen: "login",
                });
              } else {
                navigation.replace("onBoardingStack", {
                  screen: "infoScreen",
                  params: {
                    index: 0,
                    nextQuestion: firstQuestion ? firstQuestion._id : "",
                  },
                });
              }
            } else {
              // Fallback if no questions found
              navigation.replace("onBoardingStack", {
                screen: "infoScreen",
                params: {
                  index: 0,
                  nextQuestion: "",
                },
              });
            }
          } catch (error) {
            console.error("Error fetching questions:", error);
            // Fallback navigation
            navigation.replace("onBoardingStack", {
              screen: "infoScreen",
              params: {
                index: 0,
                nextQuestion: "",
              },
            });
          }
        }
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation, token, isOnBoarded]);

  return (
    <LinearGradient
      colors={[COLORS.lightGreenGradient.start, COLORS.lightGreenGradient.end]}
      style={styles.gradient}
    >
      <View>
        <Animated.View style={{ opacity: fadeAnim }}>
          <CustomIcon
            Icon={ICONS.AppLogo}
            height={verticalScale(100)}
            width={verticalScale(100)}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

export default Splash;

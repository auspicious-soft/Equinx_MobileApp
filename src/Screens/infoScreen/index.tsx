import notifee, { AuthorizationStatus } from "@notifee/react-native";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IMAGES from "../../Assets/Images";
import CustomIcon from "../../Components/CustomIcon";
import PrimaryButton from "../../Components/PrimaryButton";
import InfoScreenData from "../../Seeds/infoScreenData";
import QueastionResponse from "../../Seeds/QuestionAPIData";
import NotificationService from "../../Services/NotificationService";
import { InfoScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";

const InfoScreen: FC<InfoScreenProps> = ({ navigation, route }) => {
  const { index: currentIndex, nextQuestion } = route.params;
  const [permissionGranted, setPermissionGranted] = useState(false);

  const screenData = InfoScreenData.find((_, index) => index === currentIndex);

  // Animation values
  const imageAnim = React.useRef(new Animated.Value(-hp(50))).current; // Start from top
  const textAnim = React.useRef(new Animated.Value(-hp(50))).current; // Start from bottom
  const buttonAnim = React.useRef(new Animated.Value(hp(50))).current; // Start from bottom

  useEffect(() => {
    // Animate image/icon from top
    Animated.timing(imageAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate text from bottom
    Animated.timing(textAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Animate button from bottom (delay for staggered effect)
    Animated.timing(buttonAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
      delay: 300, // Delay to stagger animation
    }).start();

    // Check notification permission status on mount for screens 6 and 7
    if (currentIndex === 6 || currentIndex === 7) {
      checkNotificationPermission();
    }
  }, [currentIndex, imageAnim, textAnim, buttonAnim]);

  // Check if notification permissions are already granted
  const checkNotificationPermission = async () => {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      setPermissionGranted(true);
    }
  };

  const handleNext = () => {
    if (screenData && screenData?.nextScreen === "questionScreen") {
      navigation.replace("questionScreen", {
        questionId: nextQuestion || 0,
        totalQuestions: QueastionResponse.data.questions.length,
      });
    } else if (screenData && screenData?.nextScreen === "planScreen") {
      navigation.replace("planScreen");
    } else {
      navigation.navigate("infoScreen", {
        index: currentIndex + 1,
        nextQuestion: nextQuestion,
      });
    }
  };

  const initNotifications = async () => {
    try {
      await NotificationService.initializeNotifications();
      const settings = await notifee.getNotificationSettings();
      const isGranted =
        settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
      setPermissionGranted(isGranted);

      if (isGranted) {
        handleNext();
      } else {
        Alert.alert(
          "Notification Permission",
          "Notifications help you stay on track with your fasting schedule. You can enable them later in settings.",
          [{ text: "OK", onPress: () => handleNext() }]
        );
      }
    } catch (error) {
      console.error("Error initializing notifications:", error);
      Alert.alert(
        "Error",
        "There was a problem enabling notifications. You can try again later in settings.",
        [{ text: "OK", onPress: () => handleNext() }]
      );
    }
  };

  return (
    <ImageBackground
      source={IMAGES.greenBg}
      imageStyle={{ flex: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {screenData && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  transform: [{ translateY: imageAnim }],
                }}
              >
                <View style={styles.imageContainer}>
                  {currentIndex === 1 ||
                  currentIndex === 3 ||
                  currentIndex === 4 ? (
                    <Image
                      source={
                        currentIndex === 1
                          ? IMAGES.info2
                          : currentIndex === 3
                          ? IMAGES.info4
                          : IMAGES.info5
                      }
                      style={{
                        width: currentIndex === 1 ? wp(90) : wp(70),
                        height: currentIndex === 1 ? hp(60) : hp(30),
                        resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <CustomIcon
                      Icon={screenData.image}
                      width={wp(60)}
                      height={hp(25)}
                    />
                  )}
                </View>
              </Animated.View>

              <Animated.View
                style={{
                  transform: [{ translateY: textAnim }],
                  width: "100%",
                }}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{screenData.title}</Text>
                  <Text style={styles.subtitle}>{screenData.subTitle}</Text>
                  {currentIndex === 0 && (
                    <CustomText
                      fontSize={12}
                      color={COLORS.darkBLue}
                      fontFamily="regular"
                      style={{
                        textAlign: "center",
                        paddingHorizontal: horizontalScale(25),
                      }}
                    >
                      {"\n"}We need to ask you a few quick questions to create a
                      personalized plan for you. This will only take 1 minute 🙌
                    </CustomText>
                  )}
                </View>
              </Animated.View>
            </View>
          )}

          {currentIndex === InfoScreenData.length - 2 && !permissionGranted && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(20),
                width: "100%",
              }}
            >
              <PrimaryButton
                title="Enable Notifications"
                onPress={initNotifications}
                isFullWidth={false}
                style={{
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(20),
                }}
                gradientStyle={{
                  flex: 1,
                }}
              />
              <PrimaryButton
                title="Skip"
                onPress={handleNext}
                isFullWidth={false}
                bgColor={["transparent", "transparent"]}
                textColor={COLORS.darkBLue}
                style={{
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(20),
                }}
                gradientStyle={{
                  borderWidth: 0.6,
                  borderColor: COLORS.green,
                }}
              />
            </View>
          )}
          {currentIndex === InfoScreenData.length - 2 && permissionGranted && (
            <PrimaryButton title={"Continue"} onPress={handleNext} />
          )}
          {currentIndex === InfoScreenData.length - 1 && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: horizontalScale(20),
                width: "100%",
              }}
            >
              <PrimaryButton
                title="Connect to Apple Health"
                onPress={handleNext}
                isFullWidth={false}
                style={{
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(20),
                }}
                gradientStyle={{
                  flex: 1,
                }}
              />
              <PrimaryButton
                title="Skip"
                onPress={handleNext}
                isFullWidth={false}
                bgColor={["transparent", "transparent"]}
                textColor={COLORS.darkBLue}
                style={{
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(20),
                }}
                gradientStyle={{
                  borderWidth: 0.6,
                  borderColor: COLORS.green,
                }}
              />
            </View>
          )}
          {currentIndex < InfoScreenData.length - 2 && (
            <Animated.View
              style={{
                transform: [{ translateY: buttonAnim }],
                width: "100%",
              }}
            >
              <PrimaryButton title={"Continue"} onPress={handleNext} />
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: horizontalScale(20),
  },
  imageContainer: {
    marginBottom: verticalScale(30),
  },
  textContainer: {
    alignItems: "center",
    marginBottom: verticalScale(40),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkBLue,
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkBLue,
    textAlign: "center",
    paddingHorizontal: horizontalScale(20),
  },
  button: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(40),
    borderRadius: 25,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

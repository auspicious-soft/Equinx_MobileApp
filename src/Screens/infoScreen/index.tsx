import notifee, { AuthorizationStatus } from "@notifee/react-native";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
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

const InfoScreen: FC<InfoScreenProps> = ({ navigation, route }) => {
  const { index: currentIndex, nextQuestion } = route.params;
  const [permissionGranted, setPermissionGranted] = useState(false);

  const screenData = InfoScreenData.find((_, index) => index === currentIndex);

  // Check notification permission status on mount for screens 6 and 7
  useEffect(() => {
    if (currentIndex === 6 || currentIndex === 7) {
      checkNotificationPermission();
    }
  }, [currentIndex]);

  // Check if notification permissions are already granted
  const checkNotificationPermission = async () => {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      setPermissionGranted(true);
    }
  };

  const handleNext = () => {
    if (screenData?.nextScreen === "questionScreen") {
      // Navigate to the question screen
      navigation.replace("questionScreen", {
        questionId: nextQuestion || 0,
        totalQuestions: QueastionResponse.data.questions.length,
      });
    } else {
      navigation.navigate("infoScreen", {
        index: currentIndex + 1,
        nextQuestion: nextQuestion,
      });
    }
  };

  // Initialize notifications and request permission
  const initNotifications = async () => {
    try {
      // Create notification channels (Android) and request permissions
      await NotificationService.initializeNotifications();

      // Check if permission was granted
      const settings = await notifee.getNotificationSettings();
      const isGranted =
        settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;

      setPermissionGranted(isGranted);

      if (isGranted) {
        // Navigate to next screen after a short delay
        handleNext();
      } else {
        // Show alert if permission was denied
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

  console.log(permissionGranted);
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
              <View style={styles.imageContainer}>
                {currentIndex === 1 ? (
                  <Image
                    source={IMAGES.info2}
                    style={{
                      width: wp(90),
                      height: hp(60),
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

              <View style={styles.textContainer}>
                <Text style={styles.title}>{screenData.title}</Text>
                <Text style={styles.subtitle}>{screenData.subTitle}</Text>
              </View>
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

          {currentIndex < InfoScreenData.length - 1 && (
            <PrimaryButton title={"Continue"} onPress={handleNext} />
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

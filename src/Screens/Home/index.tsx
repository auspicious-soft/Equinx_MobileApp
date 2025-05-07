import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { HomeScreenProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  horizontalScale,
  hp,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";
import CircularProgress from "../../Components/CircularProgress";
import PrimaryButton from "../../Components/PrimaryButton";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import IMAGES from "../../Assets/Images";
import WaterTrackModal from "../../Components/Modals/WaterTrackModal";
import RecordIntakeModal from "../../Components/Modals/RecordIntakeModal";
import moment from "moment-timezone";

interface FastingMethod {
  type: "16:8" | "5:2";
  fastingDays?: number[]; // For 5:2, e.g., [1, 4] for Monday and Thursday (0 = Sunday)
}

const Home: FC<HomeScreenProps> = () => {
  const [isModal, setIsModal] = useState(false);
  const [recordModal, setRecordModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [isFasting, setIsFasting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fastingStatus, setFastingStatus] = useState<
    "Fasting" | "Eating" | "Low-Calorie"
  >("Eating");

  // Assume this comes from onboarding, stored in state or context
  const [fastingMethod, setFastingMethod] = useState<FastingMethod>({
    type: "16:8", // or "5:2"
    fastingDays: [1, 4], // For 5:2, Monday and Thursday
  });

  const closeModal = () => setIsModal(false);
  const closeRecordModal = () => setRecordModal(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = moment().tz(moment.tz.guess());
      let diff: number;
      let totalDuration: number;

      if (fastingMethod.type === "16:8") {
        const eatingWindowStart = moment()
          .tz(moment.tz.guess())
          .set({ hour: 12, minute: 0, second: 0 });
        const fastingWindowStart = moment()
          .tz(moment.tz.guess())
          .set({ hour: 20, minute: 0, second: 0 });

        if (now.isBetween(eatingWindowStart, fastingWindowStart, null, "[)")) {
          // Eating window
          setIsFasting(false);
          setFastingStatus("Eating");
          diff = fastingWindowStart.diff(now);
          totalDuration = moment.duration(8, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        } else {
          // Fasting window
          setIsFasting(true);
          setFastingStatus("Fasting");
          let nextEatingWindow = eatingWindowStart.clone();
          if (now.isSameOrAfter(fastingWindowStart)) {
            nextEatingWindow.add(1, "day");
          }
          diff = nextEatingWindow.diff(now);
          totalDuration = moment.duration(16, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        }
      } else if (fastingMethod.type === "5:2") {
        const currentDay = now.day(); // 0 = Sunday, 1 = Monday, etc.
        const isFastingDay = fastingMethod.fastingDays?.includes(currentDay);

        if (isFastingDay) {
          // Fasting (low-calorie) day
          setIsFasting(true);
          setFastingStatus("Low-Calorie");
          const endOfDay = moment().tz(moment.tz.guess()).endOf("day");
          diff = endOfDay.diff(now);
          totalDuration = moment.duration(24, "hours").asMilliseconds();
          setProgress(1 - diff / totalDuration);
        } else {
          // Regular eating day
          setIsFasting(false);
          setFastingStatus("Eating");
          const nextFastingDay = moment()
            .tz(moment.tz.guess())
            .day(
              fastingMethod.fastingDays![0] < currentDay
                ? fastingMethod.fastingDays![1]
                : fastingMethod.fastingDays![0]
            )
            .startOf("day");
          if (nextFastingDay.isBefore(now)) {
            nextFastingDay.add(7, "days");
          }
          diff = nextFastingDay.diff(now);
          totalDuration = moment
            .duration(
              nextFastingDay.diff(moment().tz(moment.tz.guess()).startOf("day"))
            )
            .asMilliseconds();
          setProgress(1 - diff / totalDuration);
        }
      }

      const duration = moment.duration(diff);
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");
      setTimeRemaining(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(intervalId);
  }, [fastingMethod]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingVertical: verticalScale(15),
          paddingHorizontal: horizontalScale(20),
          gap: verticalScale(20),
        }}
      >
        <View style={styles.headerContainer}>
          <CustomText fontSize={22} color={COLORS.darkBLue} fontFamily="bold">
            Good Morning{" "}
            <CustomText fontSize={22} color={COLORS.green} fontFamily="bold">
              Miley Jones
            </CustomText>
          </CustomText>
          <CustomText
            fontSize={12}
            color={COLORS.darkBLue}
            fontFamily="regular"
          >
            Ready to crush your fast today?
          </CustomText>
        </View>

        <View style={styles.topBox}>
          <View
            style={{
              gap: verticalScale(25),
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.fastingContainer,
                fastingMethod.type === "5:2" &&
                  fastingStatus === "Low-Calorie" && {
                    backgroundColor: COLORS.orange,
                  },
              ]}
            >
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {fastingMethod.type} fasting schedule
              </CustomText>
              {fastingMethod.type === "5:2" &&
                fastingStatus === "Low-Calorie" && (
                  <CustomIcon Icon={ICONS.FastingIcon} height={16} width={16} />
                )}
            </View>
            <CircularProgress
              color={
                fastingStatus === "Low-Calorie" ? COLORS.orange : COLORS.green
              }
              backgroundColor={COLORS.white}
              progress={progress}
              radius={100}
              strokeWidth={20}
              backgroundStrokeWidth={15}
              progressStrokeWidth={20}
            >
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                {fastingStatus} Time Remaining
              </CustomText>
              <CustomText
                fontSize={28}
                color={COLORS.darkBLue}
                fontFamily="bold"
              >
                {timeRemaining}
              </CustomText>
            </CircularProgress>
            <PrimaryButton
              title={`Start Your ${fastingMethod.type} ${
                isFasting ? "Fasting" : "Eating"
              }`}
              onPress={() => {}}
              style={{
                width: wp(80),
              }}
            />
          </View>
        </View>

        <View style={{ gap: verticalScale(10) }}>
          <View style={styles.penContainer}>
            <CustomText fontSize={18} fontFamily="bold" color={COLORS.darkBLue}>
              Water Tracker
            </CustomText>
            <TouchableOpacity
              style={styles.penBtn}
              onPress={() => setIsModal(true)}
            >
              <CustomIcon Icon={ICONS.penIcon} height={13} width={13} />
            </TouchableOpacity>
          </View>

          <View style={styles.waterTarckerInsideWrapper}>
            <CustomText
              fontSize={18}
              color={COLORS.green}
              style={{ textAlign: "center" }}
              fontFamily="bold"
            >
              0.5 Litres{" "}
              <CustomText
                fontSize={18}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                today
              </CustomText>
            </CustomText>
            <View style={styles.dailyGoalContainer}>
              <CustomText
                fontSize={12}
                color={COLORS.darkBLue}
                fontFamily="regular"
              >
                Daily Goal
              </CustomText>
              <CustomText
                fontSize={12}
                color={COLORS.green}
                fontFamily="regular"
              >
                3.6 liters
              </CustomText>
            </View>
            <PrimaryButton
              title="Record intake"
              onPress={() => setRecordModal(true)}
              style={{ width: wp(75) }}
            />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <CustomText fontSize={18} color={COLORS.darkBLue} fontFamily="bold">
            Quick Stats
          </CustomText>
          <View style={styles.statsWrapper}>
            <View style={styles.statsInsideCards}>
              <View
                style={{
                  gap: verticalScale(8),
                  paddingHorizontal: horizontalScale(5),
                }}
              >
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  You've fasted
                </CustomText>
                <CustomText fontSize={18} color={COLORS.green}>
                  5 days!
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  in a row
                </CustomText>
              </View>
              <Image
                source={IMAGES.homeImage}
                style={{
                  height: 90,
                  width: 100,
                  resizeMode: "cover",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
            <View style={styles.statsInsideCards}>
              <View
                style={{
                  gap: verticalScale(8),
                  paddingHorizontal: horizontalScale(5),
                }}
              >
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  Total Hours Fasted
                </CustomText>
                <CustomText fontSize={18} color={COLORS.green}>
                  72 hours
                </CustomText>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  This Week
                </CustomText>
              </View>
              <Image
                source={IMAGES.homeImag2}
                style={{
                  height: 90,
                  width: 90,
                  resizeMode: "cover",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ gap: verticalScale(10) }}>
          <ImageBackground
            source={IMAGES.yogaHomeImage}
            style={{
              height: hp(30),
              width: wp(90),
              paddingBottom: verticalScale(20),
              paddingHorizontal: horizontalScale(15),
              gap: verticalScale(10),
              justifyContent: "flex-end",
            }}
            resizeMode="cover"
            borderRadius={12}
          >
            <CustomText fontSize={14} color={COLORS.white} fontFamily="bold">
              Need Guidance? Ask Your Fasting Coach
            </CustomText>
            <CustomText fontSize={12} color={COLORS.white} fontFamily="regular">
              Get personalized tips, motivation, and fasting insights from our
              AI coach.
            </CustomText>
          </ImageBackground>
          <PrimaryButton title="Start Chat" onPress={() => {}} />
        </View>
        <WaterTrackModal
          closeModal={closeModal}
          isVisible={isModal}
          heading="Water Tracking Options"
          title="Select Container"
          size="Set Container Size"
          ml="250 ml"
          goal="Set Daily Goal"
          ml2="3600 ml"
          reminder="Water Reminder"
          description="Receive notifications to make drinking water a habit."
        />
        <RecordIntakeModal
          closeModal={closeRecordModal}
          isVisible={recordModal}
          heading="Record Intake"
          title="250 ml"
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    gap: verticalScale(10),
  },
  topBox: {
    backgroundColor: COLORS.greyishWhite,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(10),
  },
  fastingContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: verticalScale(10),
    alignItems: "center",
    paddingHorizontal: horizontalScale(15),
    flexDirection: "row",
    gap: horizontalScale(5),
  },
  penBtn: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20,
  },
  penContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  waterTarckerInsideWrapper: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 12,
    gap: verticalScale(10),
  },
  dailyGoalContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(10),
    borderRadius: 20,
    paddingVertical: verticalScale(10),
  },
  statsInsideCards: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: verticalScale(15),
    flexDirection: "row",
    width: wp(44),
    borderRadius: 15,
    paddingHorizontal: horizontalScale(10),
    overflow: "hidden",
  },
  statsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
});

import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
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

const Home: FC<HomeScreenProps> = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      <View style={styles.main}>
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
            <CustomText fontSize={22} color={COLORS.darkBLue}>
              Good Morning{" "}
              <CustomText fontSize={22} color={COLORS.green}>
                Miley Jones
              </CustomText>
            </CustomText>
            <CustomText fontSize={12} color={COLORS.darkBLue}>
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
              <View style={styles.fastingContainer}>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  16:8 fasting schedule
                </CustomText>
              </View>
              <CircularProgress
                color={COLORS.green}
                backgroundColor={COLORS.white}
                progress={0.7}
                radius={100}
                strokeWidth={20}
                backgroundStrokeWidth={15}
                progressStrokeWidth={20}
              >
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  Time since last fast
                </CustomText>
                <CustomText fontSize={28} color={COLORS.darkBLue}>
                  2 days
                </CustomText>
              </CircularProgress>
              <PrimaryButton
                title="Start Your 16h fasting"
                onPress={() => {}}
                style={{
                  width: wp(80),
                }}
              />
            </View>
          </View>

          <View style={{ gap: verticalScale(10) }}>
            <View style={styles.penContainer}>
              <CustomText
                fontSize={18}
                fontFamily="bold"
                color={COLORS.darkBLue}
              >
                Water Tracker
              </CustomText>
              <TouchableOpacity style={styles.penBtn}>
                <CustomIcon Icon={ICONS.penIcon} height={11} width={11} />
              </TouchableOpacity>
            </View>

            <View style={styles.waterTarckerInsideWrapper}>
              <CustomText
                fontSize={18}
                color={COLORS.green}
                style={{ textAlign: "center" }}
              >
                0.5 Litres{" "}
                <CustomText fontSize={18} color={COLORS.darkBLue}>
                  today
                </CustomText>
              </CustomText>
              <View style={styles.dailyGoalContainer}>
                <CustomText fontSize={12} color={COLORS.darkBLue}>
                  Daily Goal
                </CustomText>

                <CustomText fontSize={12} color={COLORS.green}>
                  3.6 liters
                </CustomText>
              </View>
              <PrimaryButton
                title="Record intake"
                onPress={() => {}}
                style={{
                  width: wp(75),
                }}
              />
            </View>
          </View>

          <View style={{ gap: 10 }}>
            <CustomText fontSize={18} color={COLORS.darkBLue}>
              Quick Stats
            </CustomText>
            <View style={styles.statsWrapper}>
              <View style={styles.statsInsideCards}>
                <View
                  style={{
                    gap: verticalScale(10),
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
                <View style={{ position: "absolute", right: 0, bottom: 1 }}>
                  <Image
                    source={IMAGES.homeImage}
                    style={{
                      height: 80,
                      width: 80,
                      resizeMode: "cover",
                    }}
                  />
                </View>
              </View>
              <View style={styles.statsInsideCards}>
                <View
                  style={{
                    gap: verticalScale(10),
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
                <View style={{ position: "absolute", right: 0, bottom: 1 }}>
                  <Image
                    source={IMAGES.homeImag2}
                    style={{
                      height: 80,
                      width: 80,
                      resizeMode: "cover",
                    }}
                  />
                </View>
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
                paddingHorizontal: horizontalScale(10),
                gap: verticalScale(10),
                justifyContent: "flex-end",
              }}
              resizeMode="cover"
            >
              <CustomText fontSize={14} color={COLORS.white}>
                Need Guidance? Ask Your Fasting Coach
              </CustomText>
              <CustomText fontSize={12} color={COLORS.white}>
                Get personalized tips, motivation, and fasting insights from our
                AI coach.
              </CustomText>
            </ImageBackground>
            <PrimaryButton title="Start Chat" onPress={() => {}} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
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
    width: wp(45),
    borderRadius: 15,
    paddingHorizontal: horizontalScale(10),
  },
  statsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(5),
  },
});

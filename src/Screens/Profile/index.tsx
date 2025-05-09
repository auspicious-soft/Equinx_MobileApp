import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { ProfileScreenProps } from "../../Typings/route";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import {
  horizontalScale,
  hp,
  isIOS,
  verticalScale,
  wp,
} from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../../Components/CustomText";
import CircularProgress from "../../Components/CircularProgress";
import IMAGES from "../../Assets/Images";
import { fastsData, FastsDataType } from "../../Seeds/ProfileScreenData";

const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const renderFastsData = ({ item }: { item: FastsDataType }) => {
    return (
      <TouchableOpacity
        style={styles.fastsContainer}
        onPress={() => {
          navigation.navigate("FastDetails");
        }}
      >
        <View style={styles.dateContainer}>
          <CustomText
            fontSize={14}
            color={COLORS.green}
            fontFamily="bold"
            style={{ textAlign: "center" }}
          >
            {item.date}{" "}
            <CustomText fontSize={14} color={COLORS.green} fontFamily="bold">
              March,
            </CustomText>
          </CustomText>
          <CustomText
            fontSize={14}
            color={COLORS.green}
            fontFamily="bold"
            style={{ textAlign: "center" }}
          >
            2025
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontFamily="medium" color={COLORS.darkBLue} fontSize={14}>
            {`${item.kcal} Kcal consumed`}
          </CustomText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: horizontalScale(8),
            }}
          >
            <View>
              <CustomText
                fontFamily="regular"
                color={COLORS.green}
                fontSize={14}
              >
                View details
              </CustomText>
              <View style={{ height: 1, backgroundColor: COLORS.green }} />
            </View>
            <CustomIcon Icon={ICONS.rightGreenArrow} height={13} width={13} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.nameContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            Hello{" "}
            <CustomText fontSize={22} fontFamily="bold" color={COLORS.green}>
              Miley Jones
            </CustomText>
          </CustomText>
        </View>

        <View style={styles.progressContainer}>
          <CustomText
            fontSize={16}
            fontFamily="regular"
            color={COLORS.slateGrey}
          >
            Today, March 25
          </CustomText>
          <CircularProgress
            color={COLORS.green}
            backgroundColor={COLORS.white}
            progress={0.7}
            radius={30}
            strokeWidth={20}
            // backgroundStrokeWidth={15}
            progressStrokeWidth={8}
          >
            <CustomText fontSize={10} color={COLORS.darkBLue}>
              65%
            </CustomText>
          </CircularProgress>
        </View>

        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontSize={12} fontFamily="bold" color={COLORS.darkBLue}>
            My Progress
          </CustomText>
          <View style={{ gap: verticalScale(8) }}>
            <View style={styles.alignContainer}>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Total fasts
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  12
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  LAST 7 FASTS (AVG.)
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  19h
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.alignContainer}>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Longest Fast
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  19h
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Longest Streak
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  2
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.alignContainer}>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Current Streak
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  1
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailWrapper}>
                <CustomText
                  fontSize={12}
                  fontFamily="regular"
                  color={COLORS.darkBLue}
                >
                  Weight
                </CustomText>
                <CustomText
                  fontSize={18}
                  fontFamily="bold"
                  color={COLORS.green}
                >
                  180 lbs
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CustomText
                  fontSize={12}
                  color={COLORS.darkBLue}
                  fontFamily="regular"
                >
                  Body Mass Index (BMI)
                </CustomText>
                <View style={styles.textContainer}>
                  <CustomText
                    fontSize={12}
                    fontFamily="medium"
                    color={COLORS.green}
                  >
                    Overweight
                  </CustomText>
                </View>
              </View>
              <CustomText fontSize={18} fontFamily="bold" color={COLORS.green}>
                29.8 kg
              </CustomText>
            </View>
          </View>
        </View>
        {isIOS && (
          <View style={styles.appleContainer}>
            <Image source={IMAGES.appleHealth} style={styles.appleImg} />
            <View style={{ gap: verticalScale(8) }}>
              <CustomText
                fontSize={14}
                fontFamily="medium"
                color={COLORS.darkBLue}
              >
                Connect to Apple Health
              </CustomText>
              <TouchableOpacity style={styles.arrowContainer}>
                <View>
                  <CustomText
                    fontSize={14}
                    fontFamily="regular"
                    color={COLORS.green}
                  >
                    Connect Now
                  </CustomText>
                  <View style={{ height: 1, backgroundColor: COLORS.green }} />
                </View>
                <CustomIcon
                  Icon={ICONS.rightGreenArrow}
                  height={13}
                  width={13}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontSize={18} color={COLORS.darkBLue} fontFamily="bold">
            Recent fasts
          </CustomText>
          <FlatList
            data={fastsData}
            renderItem={renderFastsData}
            keyExtractor={({ id }) => id.toString()}
            contentContainerStyle={{
              gap: verticalScale(10),
            }}
          />
        </View>

        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            navigation.navigate("Fasts");
          }}
        >
          <CustomText fontSize={14} fontFamily="regular" color={COLORS.green}>
            View More
          </CustomText>
          <View style={{ height: 1, backgroundColor: COLORS.green }} />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(15),
    justifyContent: "space-between",
    borderRadius: 15,
  },
  detailWrapper: {
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
    gap: verticalScale(15),
    width: wp(44),
    borderRadius: 10,
  },
  alignContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  horizontalContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    gap: verticalScale(15),
  },
  textContainer: {
    backgroundColor: COLORS.greenBg,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 6,
  },
  appleContainer: {
    backgroundColor: COLORS.greyishWhite,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  appleImg: {
    width: wp(20),
    height: hp(10),
    resizeMode: "contain",
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(8),
  },
  dateContainer: {
    backgroundColor: "#F0F8F0",
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(15),
    borderRadius: 10,
  },
  fastsContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(8),
    borderRadius: 10,
    gap: horizontalScale(10),
  },
});

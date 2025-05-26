import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { FastsScreenProps } from "../../Typings/route";
import { fastsData, FastsDataType } from "../../Seeds/ProfileScreenData";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import { FlatList } from "react-native-gesture-handler";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { SafeAreaView } from "react-native-safe-area-context";
import { RecentFast } from "../../Typings/apiResponse";

const Fasts: FC<FastsScreenProps> = ({ navigation, route }) => {
  const { fastsData } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month},\n${year}`;
  };

  const renderFatsData = ({ item }: { item: RecentFast }) => {
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
            {formatDate(item.date)}
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(5) }}>
          <CustomText fontFamily="medium" color={COLORS.darkBLue} fontSize={14}>
            {`${item.calories} Kcal consumed`}
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
        <View style={styles.arrowContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CustomIcon Icon={ICONS.BackArrow} />
          </TouchableOpacity>
          <CustomText fontSize={22} fontFamily="bold" color={COLORS.darkBLue}>
            Recent Fasts
          </CustomText>
        </View>
        <View style={{ gap: verticalScale(5) }}>
          <TouchableOpacity style={styles.filterContainer}>
            <CustomIcon Icon={ICONS.filterIcon} height={12} width={12} />
            <CustomText
              fontSize={12}
              color={COLORS.slateGrey}
              fontFamily="regular"
            >
              Filter Data
            </CustomText>
          </TouchableOpacity>
          <FlatList
            data={fastsData}
            renderItem={renderFatsData}
            keyExtractor={(index) => index + " " + index}
            contentContainerStyle={{
              gap: verticalScale(10),
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Fasts;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
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
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 10,
    gap: horizontalScale(10),
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: horizontalScale(5),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
});

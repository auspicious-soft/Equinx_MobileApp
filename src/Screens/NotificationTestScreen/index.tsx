import React, { FC } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { CustomText } from "../../Components/CustomText";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import NotificationExample from "../../Components/NotificationExample";
import PrimaryButton from "../../Components/PrimaryButton";
import { NotificationTestScreenProps } from "../../Typings/route";

const NotificationTestScreen: FC<NotificationTestScreenProps> = ({
  navigation,
}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CustomText fontSize={22} fontFamily="bold" style={styles.headerText}>
          Notification Test
        </CustomText>
      </View>

      <View style={styles.content}>
        <CustomText style={styles.description}>
          This screen demonstrates how to use Notifee to send and schedule
          notifications in your app.
        </CustomText>

        <NotificationExample />

        <CustomText style={styles.note}>
          Note: On iOS, you need to grant notification permissions when
          prompted. On Android, notifications should work without additional
          permissions.
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    padding: horizontalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.greyishWhite,
  },
  headerText: {
    color: COLORS.darkBLue,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: horizontalScale(20),
  },
  description: {
    fontSize: 16,
    color: COLORS.darkBLue,
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  note: {
    fontSize: 14,
    color: COLORS.slateGrey,
    marginTop: verticalScale(20),
    fontStyle: "italic",
  },
});

export default NotificationTestScreen;

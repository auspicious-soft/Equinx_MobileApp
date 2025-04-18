import notifee, {
    AuthorizationStatus
} from "@notifee/react-native";
import { Alert } from "react-native";

export async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log("Notification permissions authorized");
    return true;
  } else {
    console.log("Notification permissions denied");
    Alert.alert(
      "Notification Permissions",
      "Please enable notifications in your device settings to receive alerts.",
      [
        {
          text: "Go to Settings",
          onPress: () => notifee.openNotificationSettings(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
    return false;
  }
}

import notifee, { AuthorizationStatus } from "@notifee/react-native";
import { Alert } from "react-native";
import { getCountryCallingCode, getCountries } from "libphonenumber-js";

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
``;
export const callingCodeToCountryCode = (callingCode: any) => {
  try {
    // Normalize calling code (remove '+' if present)
    const normalizedCallingCode = callingCode.replace("+", "");

    // Get all supported country codes
    const countries = getCountries();

    // Find the country code that matches the calling code
    const countryCode = countries.find(
      (country) => getCountryCallingCode(country) === normalizedCallingCode
    );

    // Return country code or null if not found
    return countryCode || null;
  } catch (error) {
    console.error("Error converting calling code:", error);
    return null;
  }
};

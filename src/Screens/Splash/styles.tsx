import { StyleSheet } from "react-native";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: verticalScale(237),
    height: verticalScale(119),
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;

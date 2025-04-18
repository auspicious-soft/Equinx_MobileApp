import React, { FC, useEffect } from "react";
import { View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { SplashProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./styles";

const Splash: FC<SplashProps> = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("onBoardingStack", {
        screen: "infoScreen",
        params: {
          index: 0,
          nextQuestion: 0,
        },
      });
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.lightGreenGradient.start, COLORS.lightGreenGradient.end]}
      style={styles.gradient}
    >
      <View>
        <CustomIcon
          Icon={ICONS.AppLogo}
          height={verticalScale(100)}
          width={verticalScale(100)}
        />
      </View>
    </LinearGradient>
  );
};

export default Splash;

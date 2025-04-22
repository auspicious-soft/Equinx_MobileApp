import React, { FC, useEffect } from "react";
import { View, Animated, Easing } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { SplashProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./styles";

const Splash: FC<SplashProps> = ({ navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial opacity

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 second for fade in
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    // Navigate after 3 seconds total (1s fade-in + 1s visible + 1s fade-out)
    const timeout = setTimeout(() => {
      // Fade out animation before navigating
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 second for fade out
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("onBoardingStack", {
          screen: "infoScreen",
          params: {
            index: 0,
            nextQuestion: 0,
          },
        });
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation]);

  return (
    <LinearGradient
      colors={[COLORS.lightGreenGradient.start, COLORS.lightGreenGradient.end]}
      style={styles.gradient}
    >
      <View>
        <Animated.View style={{ opacity: fadeAnim }}>
          <CustomIcon
            Icon={ICONS.AppLogo}
            height={verticalScale(100)}
            width={verticalScale(100)}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

export default Splash;

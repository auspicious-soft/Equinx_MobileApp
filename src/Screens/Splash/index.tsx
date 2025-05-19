import React, { FC, useEffect, useState } from "react";
import { View, Animated, Easing } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ICONS from "../../Assets/Icons";
import CustomIcon from "../../Components/CustomIcon";
import { SplashProps } from "../../Typings/route";
import COLORS from "../../Utilities/Colors";
import { verticalScale } from "../../Utilities/Metrics";
import styles from "./styles";
import DeviceInfo from "react-native-device-info";
import ENDPOINTS from "../../APIService/endPoints";
import { fetchData } from "../../APIService/api";
import { GetQuestionDataResponse } from "../../Typings/apiResponse";
import { useAppDispatch } from "../../Redux/store";
import { setQuestionsData } from "../../Redux/slices/questionSlice";
import { getLocalStorageData } from "../../Utilities/Storage";
import STORAGE_KEYS from "../../Utilities/Constants";

const Splash: FC<SplashProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial opacity
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const token = await getLocalStorageData(STORAGE_KEYS.token);
    if (token) {
      setToken(token);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const getQuestionsData = async () => {
    const response = await fetchData<GetQuestionDataResponse>(
      ENDPOINTS.questions,
      {
        params: {
          deviceId: DeviceInfo.getDeviceId(),
        },
      }
    );

    if (response.data.success) {
      dispatch(setQuestionsData(response.data.data.questions));
    }
  };

  useEffect(() => {
    if (!token) {
      getQuestionsData();
    }
  }, [token]);

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
        if (token) {
          navigation.replace("mainStack", {
            screen: "tabs",
            params: {
              screen: "home",
            },
          });
        } else {
          navigation.replace("onBoardingStack", {
            screen: "infoScreen",
            params: {
              index: 0,
              nextQuestion: 0,
            },
          });
        }
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, navigation, token]);

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

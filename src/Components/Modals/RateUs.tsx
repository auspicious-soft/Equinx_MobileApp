import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { horizontalScale, verticalScale, wp } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import { CustomText } from "../CustomText";
import PrimaryButton from "../PrimaryButton";
import Toast from "react-native-toast-message";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { RatingResponse } from "../../Typings/apiResponse";
import { useLanguage } from "../../Context/LanguageContext";

const stars = [
  {
    id: 1,
    icon: ICONS.whiteStar,
  },
  {
    id: 2,
    icon: ICONS.whiteStar,
  },
  {
    id: 3,
    icon: ICONS.whiteStar,
  },
  {
    id: 4,
    icon: ICONS.whiteStar,
  },
  {
    id: 5,
    icon: ICONS.whiteStar,
  },
];

type RateUsModalProps = {
  isVisible: boolean;
  closeModal: () => void;
};

const RateUs: FC<RateUsModalProps> = ({ isVisible, closeModal }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const { translations } = useLanguage();

  const handleStarPress = (starId: number) => {
    if (hasRated) return; // Prevent interaction if already rated

    // If the same star is clicked again, reduce rating by 1
    if (rating === starId) {
      setRating(starId - 1 > 0 ? starId - 1 : null);
    } else {
      setRating(starId);
    }
  };

  const handleRating = async () => {
    const data = {
      rating: rating,
    };

    try {
      const response = await postData(ENDPOINTS.rating, data);
      if (response.data.success) {
        setHasRated(true);
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  const getRating = async () => {
    setIsLoader(true);
    try {
      const response = await fetchData<RatingResponse>(ENDPOINTS.rating);
      if (response.data.success) {
        setRating(response.data.data.rating);
        setHasRated(true); // Set hasRated to true if rating exists
      }
    } catch (error: any) {
      // If error occurs, user likely hasn't rated yet
      setHasRated(false);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      getRating(); // Fetch rating when modal becomes visible
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={closeModal}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={() => {
          closeModal();
          setRating(null);
        }}
        activeOpacity={1}
        style={styles.container}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true} // Capture touch events
          onResponderRelease={(e) => e.stopPropagation()}
        >
          <CustomIcon Icon={ICONS.rateFruitIcon} height={100} width={100} />
          {isLoader === true ? (
            <ActivityIndicator
              size="small"
              color={COLORS.green}
              style={{ padding: horizontalScale(10) }}
            />
          ) : (
            <>
              <View style={styles.rateContainer}>
                <CustomText
                  fontSize={22}
                  color={COLORS.darkBLue}
                  fontFamily="bold"
                >
                  {translations.please_rate_us}
                </CustomText>
                <View style={styles.starContainer}>
                  {stars.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleStarPress(item.id)}
                      disabled={hasRated}
                    >
                      <CustomIcon
                        Icon={
                          rating !== null && item.id <= rating
                            ? ICONS.greenStar
                            : ICONS.whiteStar
                        }
                        height={25}
                        width={25}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <PrimaryButton
                title={translations.submit}
                onPress={() => {
                  handleRating();
                  closeModal();
                }}
                isFullWidth={false}
                style={styles.btnStyle}
                disabled={hasRated || rating === null}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default RateUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
  },
  modalContent: {
    backgroundColor: COLORS.white,
    width: "100%",
    gap: verticalScale(15),
    borderRadius: 28,
    overflow: "hidden",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    borderColor: COLORS.green,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  rateContainer: {
    gap: verticalScale(15),
    justifyContent: "center",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
  },
  btnStyle: {
    width: wp(70),
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});

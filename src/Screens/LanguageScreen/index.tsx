import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../Utilities/Colors";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import CustomIcon from "../../Components/CustomIcon";
import { CustomText } from "../../Components/CustomText";
import ICONS from "../../Assets/Icons";
import { LanguageScreenProps } from "../../Typings/route";
import { useLanguage } from "../../Context/LanguageContext";
import Toast from "react-native-toast-message";

const languages = [
  {
    id: 1,
    title: "English",
    code: "en",
  },
  // {
  //   id: 2,
  //   title: "French",
  // },
  // {
  //   id: 3,
  //   title: "Mandarin",
  // },
  // {
  //   id: 4,
  //   title: "Portuguese",
  // },
  // {
  //   id: 5,
  //   title: "Russian",
  // },
  {
    id: 6,
    title: "Turkish",
    code: "tr",
  },
  // {
  //   id: 7,
  //   title: "Korean",
  // },
];

const LanguageScreen: FC<LanguageScreenProps> = ({ navigation }) => {
  const { language, setAppLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    language
  );

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    setAppLanguage(langCode);
    Toast.show({
      type: "success",
      text1: "Language changed successfully",
    });
  };
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
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
            Language
          </CustomText>
        </View>
        <View>
          {languages.map((item, index) => {
            const isSelected = item.code === selectedLanguage;

            return (
              <TouchableOpacity
                key={index}
                style={styles.languageBtn}
                onPress={() => handleLanguageChange(item.code)}
              >
                {isSelected && (
                  <CustomIcon Icon={ICONS.greenTick} height={20} width={20} />
                )}
                <CustomText
                  fontSize={14}
                  fontFamily="regular"
                  color={isSelected ? COLORS.green : COLORS.darkBLue}
                >
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(15),
  },
  languageBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: horizontalScale(10),
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(15),
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
});

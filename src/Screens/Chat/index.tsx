import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../../Components/CustomText";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";

const chatData = [
  {
    id: "1",
    sender: "bot",
    icon: true,
    message: `- How many meals do you usually eat per day? (2, 3, or more?)\n- Do you exercise regularly? (Yes/No)\n- What's your main goal? (Weight loss, muscle gain, better health?)`,
  },
  {
    id: "2",
    sender: "user",
    icon: false,

    message:
      "I eat 3 meals, exercise 3 times a week, and my goal is weight loss.",
  },
  {
    id: "3",
    sender: "bot",
    icon: true,

    message: `Perfect! Here's a recommended plan for you:\n✨ Fasting Schedule: 16:8 (Fast from 8 PM – 12 PM)\n✨ Meal Timing: Eat at 12 PM, 4 PM, and 7:30 PM\n✨ Suggested Foods: High-protein meals with healthy fats & fiber\n✨ Hydration Goal: 2.5 liters of water per day`,
  },
  {
    id: "4",
    sender: "user",
    icon: false,
    message: "Yes, please!",
  },
  {
    id: "5",
    sender: "bot",
    icon: true,

    message: `Perfect! Here's a recommended plan for you:\n✨ Fasting Schedule: 16:8 (Fast from 8 PM – 12 PM)\n✨ Meal Timing: Eat at 12 PM, 4 PM, and 7:30 PM\n✨ Suggested Foods: High-protein meals with healthy fats & fiber\n✨ Hydration Goal: 2.5 liters of water per day`,
  },
  {
    id: "6",
    sender: "user",
    icon: false,
    message: "Yes, please!",
  },
  {
    id: "7",
    sender: "bot",
    icon: true,

    message: `Perfect! Here's a recommended plan for you:\n✨ Fasting Schedule: 16:8 (Fast from 8 PM – 12 PM)\n✨ Meal Timing: Eat at 12 PM, 4 PM, and 7:30 PM\n✨ Suggested Foods: High-protein meals with healthy fats & fiber\n✨ Hydration Goal: 2.5 liters of water per day`,
  },
  {
    id: "8",
    sender: "user",
    icon: false,
    message: "Yes, please!",
  },
];

const Chat = () => {
  const [sendMessage, setSendMessage] = useState("");
  const renderchatData = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.iconMessageContainer,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        {item.icon && (
          <CustomIcon Icon={ICONS.chatBotIcon} height={27} width={27} />
        )}
        <View
          style={[
            styles.messageContainer,
            isUser ? styles.userContainer : styles.botContainer,
          ]}
        >
          <CustomText
            fontSize={10}
            fontFamily="regular"
            color={isUser ? COLORS.white : COLORS.darkBLue}
            style={{ textAlign: isUser ? "right" : "left" }}
          >
            {item.message}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <CustomText
        fontSize={22}
        fontFamily="bold"
        color={COLORS.darkBLue}
        style={{
          marginBottom: verticalScale(20),
        }}
      >
        AI Life Coach Assistant
      </CustomText>
      <KeyboardAvoidingContainer style={{ flex: 1 }}>
        <FlatList
          data={chatData}
          keyExtractor={(item) => item.id}
          renderItem={renderchatData}
          inverted
          contentContainerStyle={{
            gap: verticalScale(20),
            flexDirection: "column-reverse",
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type your text here"
            value={sendMessage}
            onChangeText={setSendMessage}
            style={styles.inputStyle}
          />
          <TouchableOpacity>
            <CustomIcon Icon={ICONS.sendIcon} height={16} width={16} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingContainer>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(20),
    gap: verticalScale(20),
    backgroundColor: COLORS.white,
  },
  messageContainer: {
    backgroundColor: COLORS.green,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    // borderRadius: 10,
    maxWidth: "75%",
  },
  userContainer: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  botContainer: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightGreenGradient.start,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(10),
  },
  inputStyle: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    width: "90%",
  },
  iconMessageContainer: {
    flexDirection: "row",
    gap: horizontalScale(5),
  },
});

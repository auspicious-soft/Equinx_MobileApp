import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../../Components/CustomText";
import CustomIcon from "../../Components/CustomIcon";
import ICONS from "../../Assets/Icons";
import { KeyboardAvoidingContainer } from "../../Components/KeyboardAvoidingComponent";
import Toast from "react-native-toast-message";
import { fetchData, postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { ChatResponse } from "../../Typings/apiResponse";
import { setChatData } from "../../Redux/slices/ChatSlice";
import TypingLoader from "../../Components/TypingLoader";
import { useLanguage } from "../../Context/LanguageContext";

const Chat = () => {
  const { translations } = useLanguage();
  const dispatch = useAppDispatch();
  const { chatData } = useAppSelector((state) => state.chatData);
  const [sendMessage, setSendMessage] = useState("");
  // const [isSending, setIsSending] = useState(false); // Track sending state
  const flatListRef = useRef<FlatList>(null); // Reference to FlatList for scrolling
  const [loadingAssistant, setLoadingAssistant] = useState(false);
  const [isBtnLoader, setIsBtnLoader] = useState(false);

  // Send message to API and update chat
  const handleSendMessage = async () => {
    if (sendMessage.trim() === "") {
      return;
    }
    const data = {
      content: sendMessage,
    };

    // Keyboard.dismiss();
    setIsBtnLoader(true);
    setSendMessage("");
    setTimeout(() => {
      setLoadingAssistant(true);
    }, 2000);
    try {
      const response = await postData(ENDPOINTS.chat, data);
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "Message sent successfully",
        });
        // Update chat data in Redux store
        await fetchChat();
      }
    } catch (error: any) {
      // Toast.show({
      //   type: "error",
      //   text1: error.message || "Something went wrong",
      // });
    } finally {
      setLoadingAssistant(false);
      setIsBtnLoader(false);
    }
  };

  // Fetch initial chat data
  const fetchChat = async () => {
    try {
      const response = await fetchData<ChatResponse>(ENDPOINTS.chatFetch);
      dispatch(setChatData(response.data.data));
    } catch (error: any) {
      // Toast.show({
      //   type: "error",
      //   text1: error.message || "Something went wrong",
      // });
    }
  };

  // Render chat message
  const renderChatData = useCallback(({ item }: { item: ChatResponse }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.iconMessageContainer,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        {item.role === "assistant" && (
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
            {item.content}
          </CustomText>
        </View>
      </View>
    );
  }, []);

  useEffect(() => {
    fetchChat();
  }, [loadingAssistant]);

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <CustomText
        fontSize={22}
        fontFamily="bold"
        color={COLORS.darkBLue}
        style={{ marginBottom: verticalScale(10) }}
      >
        {translations.coach_assistant}
      </CustomText>
      <KeyboardAvoidingContainer style={{ flex: 1, gap: verticalScale(10) }}>
        <FlatList
          ref={flatListRef}
          data={chatData || []}
          keyExtractor={(item) => item._id}
          renderItem={renderChatData}
          inverted // Display latest messages at the bottom
          contentContainerStyle={{
            gap: verticalScale(20),
            paddingBottom: verticalScale(20),
          }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {}}
        />
        {loadingAssistant && (
          <View
            style={[
              styles.iconMessageContainer,
              { justifyContent: "flex-start" },
            ]}
          >
            <CustomIcon Icon={ICONS.chatBotIcon} height={27} width={27} />
            <View style={[styles.messageContainer, styles.botContainer]}>
              <TypingLoader
                text="Assistant is typing"
                dotCount={3}
                size={10}
                color={COLORS.darkBLue}
                speed={500}
                dotSpacing={2}
              />
            </View>
          </View>
        )}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type your text here"
            value={sendMessage}
            onChangeText={setSendMessage}
            style={styles.inputStyle}
            placeholderTextColor={COLORS.lightGrey}
            // editable={!isSending} // Disable input while sending
          />

          {isBtnLoader === true ? (
            <ActivityIndicator
              size="small"
              color={COLORS.green}
              style={{ padding: horizontalScale(10) }}
            />
          ) : (
            <TouchableOpacity
              onPress={handleSendMessage}
              // disabled={isSending}
              style={styles.sendButton}
            >
              <CustomIcon
                Icon={ICONS.sendIcon}
                height={16}
                width={16}
                // style={{ opacity: isSending ? 0.5 : 1 }}
              />
            </TouchableOpacity>
          )}
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
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    maxWidth: "75%",
    borderRadius: 8,
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
    backgroundColor: "#F0F8F0",
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
    backgroundColor: COLORS.white,
  },
  inputStyle: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    width: "90%",
    fontSize: 14,
  },
  sendButton: {
    padding: horizontalScale(10),
  },
  iconMessageContainer: {
    flexDirection: "row",
    gap: horizontalScale(5),
    alignItems: "flex-end",
  },
});

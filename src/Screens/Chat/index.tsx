import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
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

const Chat = () => {
  const [sendMessage, setSendMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Track sending state
  const dispatch = useAppDispatch();
  const flatListRef = useRef<FlatList>(null); // Reference to FlatList for scrolling
  const { chatData } = useAppSelector((state) => state.chatData);

  // Send message to API and update chat
  const sendMessageAPi = async () => {
    if (!sendMessage.trim()) {
      Toast.show({
        type: "error",
        text1: "Please enter a message",
      });
      return;
    }

    setIsSending(true);
    const userMessage: ChatResponse = {
      _id: `temp_${Date.now()}`, // Temporary ID for optimistic update
      role: "user",
      content: sendMessage,
      created_at: new Date().toISOString(),
    };

    // Optimistically add user message to chat
    dispatch(setChatData([...chatData, userMessage]));
    setSendMessage("");
    Keyboard.dismiss();

    try {
      const data = { content: sendMessage };
      const response = await postData<any>(
        ENDPOINTS.chat,
        JSON.stringify(data)
      );

      // Parse streaming response
      const message = response.data
        .split("\n")
        .filter(
          (line: string) =>
            line.startsWith("data: ") && !line.includes("[DONE]")
        )
        .map((line: string) => {
          try {
            return JSON.parse(line.replace("data: ", "")).content;
          } catch {
            return "";
          }
        })
        .join("");

      if (response.data.success) {
        const botMessage: ChatResponse = {
          _id: `bot_${Date.now()}`,
          role: "assistant",
          content: message,
          created_at: new Date().toISOString(),
        };

        // Update chat with bot response
        dispatch(setChatData([userMessage, botMessage, ...chatData]));
        Toast.show({
          type: "success",
          text1: "Message sent successfully",
        });

        // Scroll to the latest message
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index: 0, animated: true });
        }, 100);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
      // Optionally remove the optimistic user message on error
      dispatch(
        setChatData(chatData.filter((msg) => msg._id !== userMessage._id))
      );
    } finally {
      setIsSending(false);
    }
  };

  // Fetch initial chat data
  const fetchChat = async () => {
    try {
      const response = await fetchData<ChatResponse>(ENDPOINTS.chatFetch);
      dispatch(setChatData(response.data.data));
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
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
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <CustomText
        fontSize={22}
        fontFamily="bold"
        color={COLORS.darkBlue}
        style={{ marginBottom: verticalScale(10) }}
      >
        AI Life Coach Assistant
      </CustomText>
      <KeyboardAvoidingContainer style={{ flex: 1, gap: verticalScale(10) }}>
        <FlatList
          ref={flatListRef}
          data={chatData}
          keyExtractor={(item) => item._id}
          renderItem={renderChatData}
          inverted // Display latest messages at the bottom
          contentContainerStyle={{
            gap: verticalScale(20),
            flexDirection: "column-reverse",
            paddingBottom: verticalScale(20),
          }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            // Auto-scroll to bottom when content changes
            // flatListRef.current?.scrollToIndex({ index: 0, animated: true });
          }}
          onScrollToIndexFailed={() => {
            // Fallback for scroll failures
            // flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
          }}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type your text here"
            value={sendMessage}
            onChangeText={setSendMessage}
            style={styles.inputStyle}
            placeholderTextColor={COLORS.lightGrey}
            editable={!isSending} // Disable input while sending
          />
          <TouchableOpacity
            onPress={sendMessageAPi}
            disabled={isSending}
            style={styles.sendButton}
          >
            <CustomIcon
              Icon={ICONS.sendIcon}
              height={16}
              width={16}
              style={{ opacity: isSending ? 0.5 : 1 }}
            />
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

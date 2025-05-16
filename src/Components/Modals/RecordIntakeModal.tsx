import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { horizontalScale, verticalScale } from "../../Utilities/Metrics";
import COLORS from "../../Utilities/Colors";
import { CustomText } from "../CustomText";
import CustomIcon from "../CustomIcon";
import ICONS from "../../Assets/Icons";
import PrimaryButton from "../PrimaryButton";
import { postData } from "../../APIService/api";
import ENDPOINTS from "../../APIService/endPoints";
import Toast from "react-native-toast-message";

const recordData = [
  {
    id: 1,
    size: 250,
  },
  {
    id: 1,
    size: 500,
  },
  {
    id: 1,
    size: 800,
  },
  {
    id: 1,
    size: 1000,
  },
];

type RecordIntakeModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  selectedRecord: string | number;
  setSelectedRecord: Dispatch<SetStateAction<string | number>>;
  getHomeData: () => void;
};

const RecordIntakeModal: FC<RecordIntakeModalProps> = ({
  isVisible,
  closeModal,
  selectedRecord,
  setSelectedRecord,
  getHomeData,
}) => {
  const [showRecordData, setShowRecordData] = useState(false);

  const handleSave = async () => {
    const data = {
      waterIntake: selectedRecord,
    };

    try {
      const response = await postData(ENDPOINTS.waterIntake, data);
      console.log(response.data);
      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: response.data.message,
        });
        closeModal();
        setShowRecordData(false);
        getHomeData();
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Something went wrong",
      });
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      onRequestClose={() => {
        closeModal();
        setShowRecordData(false);
      }}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={() => {
          closeModal();
          setShowRecordData(false);
        }}
        activeOpacity={1}
        style={styles.container}
      >
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true} // Capture touch events
          onResponderRelease={(e) => e.stopPropagation()} // Prevent propagation
        >
          <View style={styles.headingContainer}>
            <CustomText
              fontFamily={"semiBold"}
              fontSize={14}
              style={{ textAlign: "center" }}
            >
              Record Intake
            </CustomText>
          </View>

          <View
            style={{
              paddingHorizontal: horizontalScale(20),
              gap: verticalScale(20),
            }}
          >
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => {
                setShowRecordData(!showRecordData);
              }}
            >
              <CustomText fontSize={16} color={COLORS.darkBLue}>
                {selectedRecord} ml
              </CustomText>
              <CustomIcon Icon={ICONS.DropdownIcon} height={8} width={8} />
            </TouchableOpacity>

            {showRecordData && (
              <View>
                {recordData.map((item, index) => (
                  <TouchableOpacity
                    style={styles.optionContainer}
                    key={index}
                    onPress={() => {
                      setSelectedRecord(item.size);
                      setShowRecordData(false);
                    }}
                  >
                    <CustomText
                      fontSize={16}
                      color={
                        selectedRecord === item.size
                          ? COLORS.green
                          : COLORS.darkBLue
                      }
                    >
                      {item.size} ml
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <PrimaryButton title="Save" onPress={handleSave} />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default RecordIntakeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    zIndex: 1,
  },
  modalContent: {
    width: "100%",
    backgroundColor: COLORS.white,
    gap: verticalScale(25),
    borderRadius: 28,
    overflow: "hidden",
    paddingBottom: verticalScale(20),
    borderWidth: 2,
    borderColor: COLORS.green,
    zIndex: 2,
  },
  headingContainer: {
    backgroundColor: COLORS.greyishWhite,
    paddingVertical: verticalScale(15),
    borderRightColor: COLORS.lightGrey,
  },
  titleContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(8),
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyishWhite,
    borderRadius: 12,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    alignItems: "center",
    justifyContent: "center",
    gap: verticalScale(8),
    marginBottom: verticalScale(20),
  },
});

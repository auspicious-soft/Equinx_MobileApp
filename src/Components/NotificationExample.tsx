import React from 'react';
import { View, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import NotificationService from '../Services/NotificationService';
import { CustomText } from './CustomText';
import COLORS from '../Utilities/Colors';

const NotificationExample: React.FC = () => {
  // Initialize notifications when component mounts
  React.useEffect(() => {
    const initNotifications = async () => {
      await NotificationService.initializeNotifications();
    };

    initNotifications();
  }, []);

  // Send an immediate notification
  const sendImmediateNotification = async () => {
    await NotificationService.displayNotification(
      'Immediate Notification',
      'This is a test notification sent immediately.',
    );
  };

  // Schedule a notification for 5 seconds in the future
  const scheduleNotification = async () => {
    const timestamp = Date.now() + 5000; // 5 seconds from now
    await NotificationService.scheduleNotification(
      'Scheduled Notification',
      'This notification was scheduled to appear 5 seconds after you pressed the button.',
      timestamp,
    );
  };

  // Cancel all notifications
  const cancelAllNotifications = async () => {
    await NotificationService.cancelAllNotifications();
  };

  return (
    <View style={styles.container}>
      <CustomText fontSize={18} fontFamily="bold" style={styles.title}>
        Notification Examples
      </CustomText>
      
      <View style={styles.buttonContainer}>
        <PrimaryButton 
          title="Send Immediate Notification" 
          onPress={sendImmediateNotification} 
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <PrimaryButton 
          title="Schedule Notification (5s)" 
          onPress={scheduleNotification} 
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <PrimaryButton 
          title="Cancel All Notifications" 
          onPress={cancelAllNotifications} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    marginBottom: 20,
    color: COLORS.darkBLue,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 15,
  },
});

export default NotificationExample;

import notifee, {
  AndroidImportance,
  AndroidStyle,
  EventType,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

class NotificationService {
  // Initialize notification channels (required for Android)
  async initializeNotifications() {
    // Create a channel for fasting notifications (Android only)
    await notifee.createChannel({
      id: 'fasting',
      name: 'Fasting Notifications',
      lights: false,
      vibration: true,
      importance: AndroidImportance.HIGH,
    });

    // Create a channel for reminders
    await notifee.createChannel({
      id: 'reminders',
      name: 'Reminders',
      lights: false,
      vibration: true,
      importance: AndroidImportance.DEFAULT,
    });

    // Request permission (iOS only)
    await this.requestPermission();
  }

  // Request notification permissions (iOS)
  async requestPermission() {
    const settings = await notifee.requestPermission({
      sound: true,
      alert: true,
      badge: true,
      criticalAlert: false,
      provisional: false,
    });

    return settings.authorizationStatus;
  }

  // Display a basic notification
  async displayNotification(title: string, body: string, channelId = 'fasting') {
    return await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_notification', // Make sure this icon exists in android/app/src/main/res/drawable
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  }

  // Schedule a notification for a specific time
  async scheduleNotification(
    title: string,
    body: string,
    timestamp: number,
    channelId = 'fasting',
  ) {
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp, // milliseconds
    };

    // Create the notification
    return await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_notification',
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );
  }

  // Cancel all notifications
  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  }

  // Cancel a specific notification
  async cancelNotification(notificationId: string) {
    await notifee.cancelNotification(notificationId);
  }

  // Set up notification listeners
  setupListeners(onNotificationPress: (type: string, data?: any) => void) {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          if (detail.notification && detail.notification.data) {
            onNotificationPress('press', detail.notification.data);
          }
          break;
      }
    });
  }
}

export default new NotificationService();

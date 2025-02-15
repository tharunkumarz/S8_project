import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationType = 'emergency' | 'delay' | 'info';

export interface BusNotification {
  id: string;
  busNumber: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export const getNotifications = async (): Promise<BusNotification[]> => {
  try {
    const notifications = await AsyncStorage.getItem('notifications');
    if (notifications) {
      return JSON.parse(notifications);
    }
    return initialNotifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return initialNotifications;
  }
};

export const markAsRead = async (notificationId: string) => {
  try {
    const notifications = await getNotifications();
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    );
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    return updatedNotifications;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return null;
  }
};

export const initialNotifications: BusNotification[] = [
  {
    id: '1',
    busNumber: 'Bus No: 1',
    type: 'emergency',
    message: 'Bus has broken down near Annur. Replacement bus is being arranged.',
    timestamp: '10 mins ago',
    isRead: false,
  },
  // ... rest of your notifications
]; 
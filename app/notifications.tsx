import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BusNotification, NotificationType, getNotifications, markAsRead } from './services/notificationService';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<BusNotification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const notifs = await getNotifications();
    setNotifications(notifs);
  };

  const handleNotificationPress = async (id: string) => {
    const updatedNotifications = await markAsRead(id);
    if (updatedNotifications) {
      setNotifications(updatedNotifications);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'emergency':
        return { name: 'exclamationmark.triangle.fill', color: '#e91e63' };
      case 'delay':
        return { name: 'clock.fill', color: '#ff9800' };
      case 'info':
        return { name: 'info.circle.fill', color: '#2196f3' };
    }
  };

  const renderNotification = ({ item }: { item: BusNotification }) => {
    const icon = getNotificationIcon(item.type);
    
    return (
      <TouchableOpacity 
        onPress={() => handleNotificationPress(item.id)}
        activeOpacity={0.7}
      >
        <ThemedView style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
          <View style={styles.iconContainer}>
            <IconSymbol 
              name={icon.name as 'clock.fill' | 'house.fill' | 'paperplane.fill' | 'chevron.left.forwardslash.chevron.right' | 'chevron.right' | 'person.2.fill' | 'map.fill' | 'bell.fill' | 'bus.fill' | 'magnifyingglass'} 
              size={24} 
              color={icon.color}
            />
          </View>
          <View style={styles.contentContainer}>
            <ThemedText type="defaultSemiBold" style={styles.busNumber}>
              {item.busNumber}
            </ThemedText>
            <ThemedText style={styles.message}>{item.message}</ThemedText>
            <ThemedText style={styles.timestamp}>{item.timestamp}</ThemedText>
          </View>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No new updates at this time
          </ThemedText>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    gap: 12,
  },
  unreadCard: {
    backgroundColor: '#e3f2fd',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  busNumber: {
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
}); 
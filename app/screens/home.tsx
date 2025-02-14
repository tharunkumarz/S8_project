import { StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

const MENU_ITEMS = [
  {
    id: 'schedule',
    title: 'Bus Details',
    icon: 'magnifyingglass',
    description: 'View bus timings and routes'
  },
  {
    id: 'seat-allotment',
    title: 'Seat Allotment',
    icon: 'person.2.fill',
    description: 'View and manage seat assignments'
  },
  {
    id: 'routes',
    title: 'Bus Routes',
    icon: 'map.fill',
    description: 'View all bus routes and stops'
  },
  {
    id: 'notifications',
    title: 'Updates',
    icon: 'bell.fill',
    description: 'Important announcements'
  }
];

export default function HomeScreen() {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  useEffect(() => {
    const getSelectedSeat = async () => {
      try {
        const bookedSeat = await AsyncStorage.getItem('bookedSeat');
        if (bookedSeat) {
          setSelectedSeat(bookedSeat);
        }
      } catch (error) {
        console.error('Error fetching booked seat:', error);
      }
    };
    getSelectedSeat();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <ThemedView style={styles.header}>
          <Image 
            source={require('@/assets/images/bait-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <ThemedText type="title">College Bus Service</ThemedText>
          <ThemedText type="subtitle">Welcome Student</ThemedText>
        </ThemedView>

        <ThemedView style={styles.menuGrid}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(`/${item.id}` as any)}>
              <ThemedView style={styles.menuContent}>
                <IconSymbol 
                  name={item.icon as "magnifyingglass" | "person.2.fill" | "map.fill" | "bell.fill"}
                  size={32}
                  color="#0a7ea4"
                />
                <ThemedText type="subtitle">{item.title}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>

        <ThemedView style={styles.quickInfo}>
          <ThemedText type="subtitle">Today's Schedule</ThemedText>
          <ThemedView style={styles.infoCard}>
            <ThemedText type="defaultSemiBold">Next Bus: 4:30 PM</ThemedText>
            <ThemedText>Bus Number: BIT-101</ThemedText>
            <ThemedText>Route: Main Campus → City Center</ThemedText>
            <ThemedText>Your Seat: {selectedSeat || 'Not Selected'}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  menuGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '47%',
    aspectRatio: 1,
  },
  menuContent: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  quickInfo: {
    padding: 16,
    gap: 12,
  },
  infoCard: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    gap: 8,
  },
}); 
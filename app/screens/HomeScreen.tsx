import { StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useUser } from '../context/UserContext';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import type { IconSymbolName } from '@/components/ui/IconSymbol';

type AppRoutes = {
  '/schedule': undefined;
  '/seat-allotment': undefined;
  '/routes': undefined;
  '/notifications': undefined;
  '/screens/StudentLogin': undefined;
};

type MenuItem = {
  id: keyof AppRoutes;
  title: string;
  icon: IconSymbolName;
  description: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: '/schedule',
    title: 'Bus Schedule',
    icon: 'clock.fill',
    description: 'View bus timings and routes'
  },
  {
    id: '/seat-allotment',
    title: 'Seat Allotment',
    icon: 'person.2.fill',
    description: 'View and manage seat assignments'
  },
  {
    id: '/routes',
    title: 'Bus Routes',
    icon: 'map.fill',
    description: 'View all bus routes and stops'
  },
  {
    id: '/notifications',
    title: 'Updates',
    icon: 'bell.fill',
    description: 'Important announcements'
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { role } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
        <ThemedView style={styles.header}>
          <Image 
            source={require('@/assets/images/college-logo.png')}
            style={styles.logo}
          />
          <ThemedText type="title">College Bus Service</ThemedText>
          <ThemedText type="subtitle">Welcome {role === 'student' ? 'Student' : 'Admin'}!</ThemedText>
        </ThemedView>

        <ThemedView style={styles.menuGrid}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id.toString()}
              style={styles.menuItem}
              onPress={() => router.push(item.id)}>
              <ThemedView style={styles.menuContent}>
                <IconSymbol 
                  name={item.icon}
                  size={32}
                  color="#0a7ea4"
                />
                <ThemedText type="subtitle">{item.title}</ThemedText>
                <ThemedText style={styles.description}>{item.description}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>

        <Pressable onPress={() => router.push('/screens/StudentLogin')}>
          <ThemedText>Student Login</ThemedText>
        </Pressable>

        <ThemedView style={styles.quickInfo}>
          <ThemedText type="subtitle">Today's Schedule</ThemedText>
          <ThemedView style={styles.infoCard}>
            <ThemedText type="defaultSemiBold">Next Bus: 4:30 PM</ThemedText>
            <ThemedText>Route: Main Campus → City Center</ThemedText>
            <ThemedText>Your Seat: 23B</ThemedText>
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
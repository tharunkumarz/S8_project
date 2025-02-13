import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Type for bus details
type BusDetail = {
  id: string;
  busNumber: string;
  route: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
};

export default function ScheduleScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [busSchedules, setBusSchedules] = useState<BusDetail[]>([]);
  const [filteredSchedules, setFilteredSchedules] = useState<BusDetail[]>([]);

  // Fetch bus details from your database
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockData: BusDetail[] = [
      {
        id: '1',
        busNumber: 'BIT-101',
        route: 'Main Campus → City Center',
        departureTime: '7:30 AM',
        arrivalTime: '8:30 AM',
        availableSeats: 25,
      },
      {
        id: '2',
        busNumber: 'BIT-102',
        route: 'City Center → Main Campus',
        departureTime: '4:30 PM',
        arrivalTime: '5:30 PM',
        availableSeats: 30,
      },
    ];
    setBusSchedules(mockData);
    setFilteredSchedules(mockData);
  }, []);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = busSchedules.filter(
      bus =>
        bus.busNumber.toLowerCase().includes(text.toLowerCase()) ||
        bus.route.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSchedules(filtered);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Bus Details' }} />
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.searchContainer}>
          <IconSymbol 
            name="magnifyingglass" 
            size={24} 
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by bus number or route..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#666"
          />
        </ThemedView>

        <FlatList
          data={filteredSchedules}
          renderItem={({ item }) => (
            <ThemedView style={styles.busCard}>
              <ThemedText type="defaultSemiBold">Bus Number: {item.busNumber}</ThemedText>
              <ThemedText>Route: {item.route}</ThemedText>
              <ThemedView style={styles.timeContainer}>
                <ThemedText>Departure: {item.departureTime}</ThemedText>
                <ThemedText>Arrival: {item.arrivalTime}</ThemedText>
              </ThemedView>
              <ThemedText>Available Seats: {item.availableSeats}</ThemedText>
            </ThemedView>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  listContainer: {
    gap: 16,
  },
  busCard: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    gap: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    marginRight: 10,
  },
}); 
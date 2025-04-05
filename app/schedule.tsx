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
  eveningArrival: string;
  stops: string[];
};

// Update the initial bus details array
const initialSchedules: BusDetail[] = [
  {
    id: '1',
    busNumber: 'Bus No: 1',
    route: 'Coimbatore',
    departureTime: '7:00 AM',
    eveningArrival: '6:00 PM',
    stops: ['Annur', 'Puliyampatti'],
  },
  {
    id: '2',
    busNumber: 'Bus No: 2',
    route: 'Gandhipuram',
    departureTime: '7:15 AM',
    eveningArrival: '6:15 PM',
    stops: ['Saravanampatti', 'Annur', 'Puliyampatti'],
  },
  {
    id: '3',
    busNumber: 'Bus No: 3',
    route: 'RS Puram',
    departureTime: '7:30 AM',
    eveningArrival: '6:30 PM',
    stops: ['Thudiyalur', 'Annur', 'Puliyampatti'],
  },
  {
    id: '4',
    busNumber: 'Bus No: 4',
    route: 'Ukkadam',
    departureTime: '7:00 AM',
    eveningArrival: '6:00 PM',
    stops: ['Singanallur', 'Annur', 'Puliyampatti'],
  },
  {
    id: '5',
    busNumber: 'Bus No: 5',
    route: 'Singanallur',
    departureTime: '7:20 AM',
    eveningArrival: '6:20 PM',
    stops: ['Ganapathy', 'Annur', 'Puliyampatti'],
  },
  {
    id: '6',
    busNumber: 'Bus No: 6',
    route: 'Peelamedu',
    departureTime: '7:45 AM',
    eveningArrival: '6:45 PM',
    stops: ['Hopes', 'Annur', 'Puliyampatti'],
  },
  {
    id: '7',
    busNumber: 'Bus No: 7',
    route: 'Saravanampatti',
    departureTime: '7:10 AM',
    eveningArrival: '6:10 PM',
    stops: ['Kovil Palayam', 'Annur', 'Puliyampatti'],
  },
  {
    id: '8',
    busNumber: 'Bus No: 8',
    route: 'Thudiyalur',
    departureTime: '7:05 AM',
    eveningArrival: '6:05 PM',
    stops: ['Ganeshapuram', 'Annur', 'Puliyampatti'],
  },
  {
    id: '9',
    busNumber: 'Bus No: 9',
    route: 'Ganapathy',
    departureTime: '7:25 AM',
    eveningArrival: '6:25 PM',
    stops: ['Vinayagapuram', 'Annur', 'Puliyampatti'],
  },
  {
    id: '10',
    busNumber: 'Bus No: 10',
    route: 'Hopes',
    departureTime: '7:35 AM',
    eveningArrival: '6:35 PM',
    stops: ['Kanthi Nagar', 'Annur', 'Puliyampatti'],
  },
];

export default function ScheduleScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [schedules, setSchedules] = useState<BusDetail[]>(initialSchedules);
  const [filteredSchedules, setFilteredSchedules] = useState<BusDetail[]>(initialSchedules);

  // Remove or modify the useEffect that was overwriting the data
  useEffect(() => {
    // No need to fetch mock data since we're using initialSchedules
    setFilteredSchedules(initialSchedules);
  }, []);

  // Handle search
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = schedules.filter(
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
              <ThemedText type="defaultSemiBold">{item.busNumber}</ThemedText>
              <ThemedText>Route: {item.route}</ThemedText>
              <ThemedText>Departure: {item.departureTime}</ThemedText>
              <ThemedText>Evening Arrival: {item.eveningArrival}</ThemedText>
              <ThemedText>Stops: {item.stops.join(', ')}</ThemedText>
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
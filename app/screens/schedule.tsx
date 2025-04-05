import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getBusSchedules } from '../services/api';

interface BusSchedule {
  busNumber: string;
  departureCity: string;
  departureTime: string;
  returnTime: string;
  stops: string[];
}

export default function ScheduleScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [busDetails, setBusDetails] = useState<BusSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBusSchedules();
  }, []);

  const fetchBusSchedules = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getBusSchedules();
      console.log('Fetched data:', data);
      setBusDetails(data);
    } catch (err) {
      setError('Failed to fetch bus schedules');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBusCard = ({ item }: { item: BusSchedule }) => (
    <ThemedView style={styles.busCard}>
      <ThemedText style={styles.busNumber}>
        Bus No: {item.busNumber}
      </ThemedText>
      <ThemedText style={styles.detailText}>
        Departure City: {item.departureCity}
      </ThemedText>
      <ThemedText style={styles.detailText}>
        Departure Time: {item.departureTime}
      </ThemedText>
      <ThemedText style={styles.detailText}>
        Return Time: {item.returnTime}
      </ThemedText>
      <ThemedText style={styles.detailText}>
        Stopping: {item.stops.join(', ')}
      </ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Bus Details',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
        }} 
      />
      
      <ThemedView style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bus number..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      {isLoading ? (
        <ThemedView style={styles.centerContent}>
          <ActivityIndicator size="large" color="#0a7ea4" />
        </ThemedView>
      ) : error ? (
        <ThemedView style={styles.centerContent}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={busDetails.filter(bus => 
            bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          renderItem={renderBusCard}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          refreshing={isLoading}
          onRefresh={fetchBusSchedules}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  busCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  busNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a7ea4',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
}); 
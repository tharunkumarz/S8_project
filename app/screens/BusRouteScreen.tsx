import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface BusStop {
  arrivalTime: string;
  departureTime: string;
  location: string;
  distance: string;
  platform?: string;
  isCurrentStop?: boolean;
}

export default function BusRouteScreen() {
  const [stops, setStops] = useState<BusStop[]>([
    { arrivalTime: '8:04 AM', departureTime: '8:05 AM', location: 'Coimbatore', distance: '0 km' },
    { arrivalTime: '8:11 AM', departureTime: '8:15 AM', location: 'Vinayagapuram', distance: '10 km' },
    { arrivalTime: '8:17 AM', departureTime: '8:19 AM', location: 'Saravanampatti', distance: '22 km' },
    { arrivalTime: '8:30 AM', departureTime: '8:34 AM', location: 'Kovil Palayam', distance: '30 km' },
    { arrivalTime: '8:40 AM', departureTime: '8:44 AM', location: 'Ganeshapuram', distance: '40 km' },
    { arrivalTime: '8:46 AM', departureTime: '8:46 AM', location: 'Annur', distance: '48 km' },
    { arrivalTime: '8:52 AM', departureTime: '8:53 AM', location: 'Puliyampatti', distance: '62 km' },
    { arrivalTime: '8:59 AM', departureTime: '9:00 AM', location: 'Kanthi Nagar', distance: '70 km' },
    { arrivalTime: '9:03 AM', departureTime: '9:05 AM', location: 'Sathyamangalam', distance: '80 km' },
    { arrivalTime: '9:08 AM', departureTime: '9:10 AM', location: 'BIT', distance: '85 km' }
  ]);

  const [currentLocation, setCurrentLocation] = useState('Kovil Palayam');
  const [distanceToNext, setDistanceToNext] = useState(2);

  useEffect(() => {
    // Simulate location updates
    const interval = setInterval(() => {
      setDistanceToNext(prev => Math.max(0, prev - 0.1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          headerTitle: 'Day 1 - Feb 15, Sat',
          headerTitleAlign: 'center',
        }}
      />

      <View style={styles.headerRow}>
        <ThemedText style={styles.columnHeader}>Arrival</ThemedText>
        <View style={styles.locationHeader}>
          <ThemedText style={styles.columnHeader}>Location</ThemedText>
        </View>
        <ThemedText style={styles.columnHeader}>Departure</ThemedText>
      </View>

      <ScrollView style={styles.scrollView}>
        {stops.map((stop, index) => (
          <ThemedView 
            key={index} 
            style={[
              styles.stopContainer,
              stop.location === currentLocation && styles.currentStop
            ]}
          >
            <View style={styles.timeColumn}>
              <ThemedText style={[
                styles.time,
                stop.location === currentLocation && styles.currentText
              ]}>
                {stop.arrivalTime}
              </ThemedText>
            </View>

            <View style={styles.locationColumn}>
              <View style={styles.routeLine}>
                <View style={[
                  styles.dot,
                  stop.location === currentLocation && styles.currentDot
                ]}>
                  {stop.location === currentLocation && (
                    <View style={styles.busIconContainer}>
                      <IconSymbol 
                        name="bus.fill" 
                        size={16} 
                        color="#ffffff"
                      />
                    </View>
                  )}
                </View>
                {index !== stops.length - 1 && <View style={styles.line} />}
              </View>
              
              <View style={styles.locationInfo}>
                <ThemedText style={[
                  styles.location,
                  stop.location === currentLocation && styles.currentText
                ]}>
                  {stop.location}
                  {stop.platform && ` Platform ${stop.platform}`}
                </ThemedText>
                <ThemedText style={styles.distance}>{stop.distance}</ThemedText>
              </View>
            </View>

            <View style={styles.timeColumn}>
              <ThemedText style={[
                styles.time,
                stop.location === currentLocation && styles.currentText
              ]}>
                {stop.departureTime}
              </ThemedText>
            </View>
          </ThemedView>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <IconSymbol name="bus.fill" size={24} color="#0a7ea4" />
        <ThemedText style={styles.footerText}>
          {distanceToNext.toFixed(1)} km to {currentLocation}
        </ThemedText>
        <ThemedText style={styles.updateText}>
          Updated few seconds ago
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  columnHeader: {
    color: '#fff',
    fontWeight: 'bold',
    width: 100,
    textAlign: 'center',
    fontSize: 16,
  },
  locationHeader: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  stopContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  currentStop: {
    backgroundColor: '#e6f3f7',
  },
  timeColumn: {
    width: 100,
    alignItems: 'center',
  },
  locationColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeLine: {
    width: 20,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0a7ea4',
  },
  currentDot: {
    backgroundColor: '#0a7ea4',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: '#0a7ea4',
    marginTop: 4,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  time: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  currentText: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
  },
  distance: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f8f8f8',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  updateText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 'auto',
  },
  busIconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}); 
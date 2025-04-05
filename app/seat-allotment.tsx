import { Stack, router } from 'expo-router';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

type SeatStatus = 'booked' | 'selected' | 'empty';

interface Seat {
  id: string;
  status: SeatStatus;
  position: 'left' | 'right';
}

export default function SeatAllotmentScreen() {
  const [seats, setSeats] = useState<Seat[]>(Array.from({ length: 50 }, (_, i) => {
    const row = Math.floor(i / 5) + 1;
    const seatInRow = i % 5;
    return {
      id: `${row}${String.fromCharCode(65 + seatInRow)}`,
      status: Math.random() > 0.6 ? 'booked' : 'empty',
      position: seatInRow < 2 ? 'left' : 'right' // First 2 seats are left, last 3 are right
    };
  }));
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const handleSeatPress = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    // If the clicked seat is already selected, unselect it
    if (seat.status === 'selected') {
      setSeats(currentSeats => 
        currentSeats.map(s => 
          s.id === seatId ? { ...s, status: 'empty' } : s
        )
      );
      setSelectedSeats([]);
      return;
    }

    // If another seat is already selected, don't allow new selection
    if (selectedSeats.length > 0) {
      // Optionally show an alert or message
      alert('You can only select one seat');
      return;
    }

    // Select the new seat
    setSeats(currentSeats => 
      currentSeats.map(s => 
        s.id === seatId ? { ...s, status: 'selected' } : s
      )
    );
    setSelectedSeats([seatId]);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Seat Allotment' }} />
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.bookedSeat]} />
            <ThemedText>Booked Seats </ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.selectedSeat]} />
            <ThemedText>Selected Seat </ThemedText>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.emptySeat]} />
            <ThemedText>Empty Seats</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.busLayout}>
          <View style={styles.seatGrid}>
            {Array.from({ length: 10 }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {/* Left side - 2 seats */}
                <View style={styles.leftSeats}>
                  {seats.slice(rowIndex * 5, rowIndex * 5 + 2).map((seat) => (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,
                        seat.status === 'booked' && styles.bookedSeat,
                        seat.status === 'selected' && styles.selectedSeat,
                        seat.status === 'empty' && styles.emptySeat,
                      ]}
                      onPress={() => handleSeatPress(seat.id)}
                      disabled={seat.status === 'booked'}
                    >
                      <ThemedText 
                        style={[
                          styles.seatText,
                          seat.status !== 'empty' && { color: '#FFFFFF', opacity: 0.9 }
                        ]}
                      >
                        {seat.id}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Aisle */}
                <View style={styles.aisle} />

                {/* Right side - 3 seats */}
                <View style={styles.rightSeats}>
                  {seats.slice(rowIndex * 5 + 2, (rowIndex + 1) * 5).map((seat) => (
                    <TouchableOpacity
                      key={seat.id}
                      style={[
                        styles.seat,
                        seat.status === 'booked' && styles.bookedSeat,
                        seat.status === 'selected' && styles.selectedSeat,
                        seat.status === 'empty' && styles.emptySeat,
                      ]}
                      onPress={() => handleSeatPress(seat.id)}
                      disabled={seat.status === 'booked'}
                    >
                      <ThemedText 
                        style={[
                          styles.seatText,
                          seat.status !== 'empty' && { color: '#FFFFFF', opacity: 0.9 }
                        ]}
                      >
                        {seat.id}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.footer}>
          <ThemedText style={styles.note}>
            * Seat will be renewable in next fees payment
          </ThemedText>
          <TouchableOpacity 
            style={[
              styles.nextButton,
              selectedSeats.length === 0 && styles.disabledButton
            ]}
            onPress={async () => {
              if (selectedSeats.length === 1) {
                // Show alert with booked seat number
                alert(`Successfully booked seat ${selectedSeats[0]}`);
                
                // Save the selected seat to AsyncStorage
                try {
                  await AsyncStorage.setItem('bookedSeat', selectedSeats[0]);
                } catch (error) {
                  console.error('Error saving seat:', error);
                }

                // Update the seat status to booked
                setSeats(currentSeats =>
                  currentSeats.map(s =>
                    s.id === selectedSeats[0] ? { ...s, status: 'booked' } : s
                  )
                );
                
                // Clear selection
                setSelectedSeats([]);
                
                // Navigate back to home screen
                router.back();
              }
            }}
            disabled={selectedSeats.length === 0}
          >
            <ThemedText style={styles.buttonText}>
              Confirm Selection
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  busLayout: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  seatGrid: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    marginBottom: 6,
  },
  leftSeats: {
    flexDirection: 'row',
    gap: 8,
    width: '40%',
    justifyContent: 'flex-end',
  },
  rightSeats: {
    flexDirection: 'row',
    gap: 8,
    width: '40%',
    justifyContent: 'flex-start',
  },
  aisle: {
    width: '20%',
    height: 44,
  },
  seat: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  bookedSeat: {
    backgroundColor: '#4c9cb0',
  },
  selectedSeat: {
    backgroundColor: '#96a5a8',
  },
  emptySeat: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  seatText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    opacity: 0.7,
  },
  footer: {
    padding: 12,
    gap: 8,
  },
  note: {
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
  },
  nextButton: {
    backgroundColor: '#4c9cb0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7,
  },
}); 
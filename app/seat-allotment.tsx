import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React from 'react';
export default function SeatAllotmentScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Seat Allotment' }} />
      <SafeAreaView style={styles.container}>
        <ThemedView>
          <ThemedText type="title">Seat Allotment</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 
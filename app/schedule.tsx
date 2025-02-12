import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ScheduleScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Bus Schedule' }} />
      <SafeAreaView style={styles.container}>
        <ThemedView>
          <ThemedText type="title">Bus Schedule</ThemedText>
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
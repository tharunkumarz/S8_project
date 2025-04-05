import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function ServicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Services</Text>
      <Text>Manage your services here.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
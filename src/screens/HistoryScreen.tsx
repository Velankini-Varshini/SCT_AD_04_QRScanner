import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HistoryScreen() {
  const [history, setHistory] = useState<string[]>([]);

  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem('scanHistory');

    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const clearHistory = async () => {
    await AsyncStorage.removeItem('scanHistory');
    setHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan History</Text>

      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 40 }}>No scans yet.</Text>
        }
      />

      <TouchableOpacity style={styles.button} onPress={clearHistory}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
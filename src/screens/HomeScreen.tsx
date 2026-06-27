import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scanner App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Generator')}
      >
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('History')}
            >
            <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 10,
    marginVertical: 12,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
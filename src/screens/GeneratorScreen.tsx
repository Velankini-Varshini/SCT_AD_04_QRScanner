import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function GeneratorScreen() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');

  const generateQRCode = () => {
    if (text.trim() === '') return;

    setQrValue(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter text or URL"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>

      {qrValue !== '' && (
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            size={220}
          />

          <Text style={styles.result}>{qrValue}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  qrContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  result: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
});
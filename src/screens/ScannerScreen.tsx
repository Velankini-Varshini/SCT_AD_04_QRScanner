import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveHistory = async (value: string) => {
  try {
    const existing = await AsyncStorage.getItem('scanHistory');

    const history = existing ? JSON.parse(existing) : [];

    history.unshift(value);

    await AsyncStorage.setItem(
      'scanHistory',
      JSON.stringify(history)
    );
  } catch (error) {
    console.log(error);
  }
};

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [facing] = useState<CameraType>('back');

  const handleScan = async ({ data }: { data: string }) => {
    setScanned(true);
    setScannedData(data);
    await saveHistory(data);

    const isUrl = /^(https?:\/\/|www\.)/i.test(data);

    if (isUrl) {
      Alert.alert(
        'QR Code Scanned',
        data,
        [
          {
            text: 'Open Link',
            onPress: () => Linking.openURL(data),
          },
          {
            text: 'Copy',
            onPress: async () => {
              await Clipboard.setStringAsync(data);
              Alert.alert('Copied!', 'Link copied to clipboard.');
            },
          },
          {
            text: 'Close',
          },
        ]
      );
    } else {
      Alert.alert(
        'QR Code Scanned',
        data,
        [
          {
            text: 'Copy',
            onPress: async () => {
              await Clipboard.setStringAsync(data);
              Alert.alert('Copied!', 'Text copied to clipboard.');
            },
          },
          {
            text: 'Close',
          },
        ]
      );
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera permission is required to scan QR codes.
        </Text>

        <Button
          title="Grant Permission"
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.scanBox} />
        <Text style={styles.instruction}>
          Align the QR code within the frame
        </Text>
      </View>

      {scanned && (
        <View style={styles.bottom}>
          <Text style={styles.resultTitle}>Last Scan:</Text>

          <Text style={styles.result}>
            {scannedData}
          </Text>

          <Button
            title="Scan Again"
            onPress={() => {
              setScanned(false);
              setScannedData('');
            }}
          />
        </View>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    top: 80,
    alignItems: 'center',
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#00FF99',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },

  instruction: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  bottom: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 20,
  },

  resultTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  result: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
});
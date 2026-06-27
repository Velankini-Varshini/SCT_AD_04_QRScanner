import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import GeneratorScreen from '../screens/GeneratorScreen';
import HistoryScreen from '../screens/HistoryScreen';

export type RootStackParamList = {
    Home: undefined;
    Scanner: undefined;
    Generator: undefined;
    History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'QR Scanner' }}
        />

        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ title: 'Scan QR Code' }}
        />

        <Stack.Screen
          name="Generator"
          component={GeneratorScreen}
          options={{ title: 'Generate QR Code' }}
        />

        <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: 'History' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
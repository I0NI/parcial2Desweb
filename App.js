import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme as NavTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import MenuScreen from './src/screens/MenuScreen';
import RandomScreen from './src/screens/RandomScreen';

const Stack = createStackNavigator();

const brand = {
  primary: '#7A0A0A',     // rojo vino más elegante
  surface: '#F7F4F4',
  text: '#1E1E1E',
};

const paperTheme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.primary,
    secondary: '#2B2B2B',
    background: '#FFFFFF',
    surface: brand.surface,
    onSurface: brand.text,
  },
};

const navTheme = {
  ...NavTheme,
  colors: {
    ...NavTheme.colors,
    primary: brand.primary,
    background: '#FFFFFF',
    card: brand.primary,
    text: '#FFFFFF',
    border: '#EAEAEA',
  },
};

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerStyle: { backgroundColor: brand.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800', letterSpacing: 0.3 },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Restaurante • Menú' }} />
          <Stack.Screen name="Random" component={RandomScreen} options={{ title: 'Platillo Random' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

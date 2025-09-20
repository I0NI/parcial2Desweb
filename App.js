import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importamos las pantallas
import MenuScreen from "./src/screens/MenuScreen";
import RandomScreen from "./src/screens/RandomScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: { backgroundColor: "#8B0000" }, // rojo vino
          headerTintColor: "#fff", // texto blanco
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{ title: "Restaurante • Menú" }}
        />
        <Stack.Screen
          name="Random"
          component={RandomScreen}
          options={{ title: "Platillo Random" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

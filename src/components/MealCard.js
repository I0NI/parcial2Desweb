import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MealCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>{meal.strMeal}</Text>
        <Text style={styles.badge}>{meal.strCategory || "Meal"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    elevation: 3
  },
  image: {
    width: 74,
    height: 74,
    borderRadius: 10,
    marginRight: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  badge: {
    fontSize: 12,
    color: "#8B0000",
    fontWeight: "600"
  }
});

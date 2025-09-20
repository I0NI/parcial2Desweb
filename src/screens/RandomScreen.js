import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

export default function RandomScreen() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRandom = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const json = await res.json();
      setMeal(json.meals?.[0] || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRandom(); }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} size="large" color="#8B0000" />;
  if (!meal) return <Text style={{ textAlign: "center", marginTop: 24 }}>No se pudo cargar.</Text>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const mea = meal[`strMeasure${i}`];
    if (ing && ing.trim()) ingredients.push(`${mea || ""} ${ing}`.trim());
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.cat}>Categoría: {meal.strCategory} • Origen: {meal.strArea}</Text>

      {ingredients.length > 0 && (
        <>
          <Text style={styles.section}>Ingredientes</Text>
          {ingredients.map((l, idx) => <Text key={idx} style={styles.item}>• {l}</Text>)}
        </>
      )}

      <Text style={styles.section}>Instrucciones</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  title: { fontSize: 22, fontWeight: "800", textAlign: "center", marginBottom: 10 },
  image: { width: "100%", height: 220, borderRadius: 14, marginBottom: 12 },
  cat: { textAlign: "center", color: "#8B0000", fontWeight: "600", marginBottom: 8 },
  section: { fontSize: 18, fontWeight: "700", marginTop: 10, marginBottom: 6 },
  item: { fontSize: 14, marginBottom: 3 },
  instructions: { fontSize: 14, lineHeight: 20, textAlign: "justify", marginBottom: 30 },
});

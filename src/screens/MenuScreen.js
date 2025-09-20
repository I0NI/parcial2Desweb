import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, RefreshControl, TouchableOpacity } from "react-native";
import MealCard from "../components/MealCard";

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";

export default function MenuScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL);
      const json = await res.json();
      setMeals(json.meals || []);
    } catch (e) {
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMeals(); }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? meals.filter(m => m.strMeal.toLowerCase().includes(s)) : meals;
  }, [q, meals]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍽️ Menú de Recetas</Text>

      {/* CREATIVIDAD: buscador */}
      <TextInput
        placeholder="Buscar receta..."
        value={q}
        onChangeText={setQ}
        style={styles.search}
        autoCapitalize="none"
        placeholderTextColor="#777"
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={() => navigation.navigate("Random")} />
        )}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchMeals} />}
        ListEmptyComponent={!loading && (<Text style={styles.empty}>Sin resultados</Text>)}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Botón flotante para ir al random directamente */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("Random")}>
        <Text style={styles.fabTxt}>🎲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F3F2", padding: 12 },
  header: { fontSize: 20, fontWeight: "800", textAlign: "center", marginBottom: 10, color: "#3A2D2D" },
  search: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8, elevation: 2, borderWidth: 0.5, borderColor: "#eee" },
  empty: { textAlign: "center", marginTop: 20, color: "#555" },
  fab: { position: "absolute", right: 16, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: "#8B0000", alignItems: "center", justifyContent: "center", elevation: 6 },
  fabTxt: { color: "#fff", fontSize: 22 },
});

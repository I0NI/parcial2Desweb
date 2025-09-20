import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';
import { Text, FAB, ActivityIndicator } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import MealCard from '../components/MealCard';

const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=a';

export default function MenuScreen({ navigation }) {
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const maxW = Math.min(width - 24, 960); // contenedor centrado en web

  const fetchMeals = async () => {
    try {
      const res = await fetch(URL);
      const json = await res.json();
      setMeals(json.meals || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMeals(); }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating size="large" />
        <Text style={{ marginTop: 12 }}>Cargando menú…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F4F4' }}>
      <View style={{ alignItems: 'center', paddingTop: 12 }}>
        <Animatable.Text
          animation="fadeInDown"
          duration={450}
          style={{ textAlign: 'center', fontWeight: '900', fontSize: 20, color: '#352F2F' }}
        >
          🍽️ Menú de Recetas
        </Animatable.Text>

        <View style={{ width: maxW, paddingHorizontal: 12, paddingTop: 6 }}>
          {meals?.map((m, i) => (
            <MealCard key={m.idMeal} meal={m} index={i} onPress={() => navigation.navigate('Random')} />
          ))}
          <View style={{ height: 96 }} />
        </View>
      </View>

      {/* FAB flotante con etiqueta */}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          right: 16,
          bottom: Platform.select({ ios: 28, android: 24, default: 24 }),
        }}
      >
        <FAB
          icon="dice-5-outline"
          label="Random"
          style={{ backgroundColor: '#7A0A0A' }}
          onPress={() => navigation.navigate('Random')}
        />
      </View>
    </View>
  );
}

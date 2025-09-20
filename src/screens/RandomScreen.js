import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Chip, Button, Text, Divider } from 'react-native-paper';
import { Linking } from 'react-native';

export default function RandomScreen() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const maxW = Math.min(width - 24, 900);

  const loadRandom = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const json = await res.json();
      setMeal(json.meals?.[0] || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRandom(); }, []);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    const out = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const mea = meal[`strMeasure${i}`];
      if (ing && ing.trim()) out.push({ ing: ing.trim(), mea: (mea || '').trim() });
    }
    return out;
  }, [meal]);

  const open = (url) => url && Linking.openURL(url).catch(() => {});

  if (loading || !meal) {
    return (
      <Animatable.View animation="fadeIn" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Cargando platillo…</Text>
      </Animatable.View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
      contentContainerStyle={{ alignItems: 'center', padding: 12, paddingBottom: 28 }}
      showsVerticalScrollIndicator
    >
      <View style={{ width: maxW }}>
        <Animatable.Text
          animation="fadeInDown"
          duration={420}
          style={{ textAlign: 'center', fontSize: 24, fontWeight: '900', marginBottom: 10, color: '#2B2B2B' }}
        >
          {meal.strMeal}
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" duration={450}>
          <Card mode="elevated" style={{ borderRadius: 18, overflow: 'hidden' }}>
            <Card.Cover
              source={{ uri: meal.strMealThumb }}
              style={{ height: 240 }}
              resizeMode="cover"
            />
            <Card.Content style={{ paddingTop: 12, rowGap: 8 }}>
              <Text style={{ fontWeight: '800', color: '#7A0A0A' }}>
                {meal.strCategory ? `🍽️ ${meal.strCategory}` : ''}{meal.strArea ? `   •   🌍 ${meal.strArea}` : ''}
              </Text>

              {meal.strTags && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {meal.strTags.split(',').map((t) => (
                    <Chip key={t.trim()} compact style={{ marginRight: 8 }} >
                      #{t.trim()}
                    </Chip>
                  ))}
                </ScrollView>
              )}
            </Card.Content>
          </Card>
        </Animatable.View>

        {ingredients.length > 0 && (
          <Animatable.View animation="fadeInUp" delay={80}>
            <Text variant="titleMedium" style={{ fontWeight: '900', marginVertical: 10 }}>
              Ingredientes
            </Text>
            <Card mode="outlined" style={{ borderRadius: 16 }}>
              <Card.Content style={{ paddingVertical: 0 }}>
                {ingredients.map(({ ing, mea }, idx) => (
                  <React.Fragment key={`${ing}-${idx}`}>
                    {idx > 0 && <Divider />}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                      <Text style={{ flex: 1 }}>{`• ${ing}`}</Text>
                      <Text style={{ color: '#666', marginLeft: 12 }}>{mea}</Text>
                    </View>
                  </React.Fragment>
                ))}
              </Card.Content>
            </Card>
          </Animatable.View>
        )}

        {meal.strInstructions && (
          <Animatable.View animation="fadeInUp" delay={120}>
            <Text variant="titleMedium" style={{ fontWeight: '900', marginVertical: 10 }}>
              Instrucciones
            </Text>
            <Card mode="contained" style={{ backgroundColor: '#F6F4F4', borderRadius: 16 }}>
              <Card.Content>
                <Text style={{ lineHeight: 22, textAlign: 'justify', color: '#3A3A3A' }}>
                  {meal.strInstructions}
                </Text>
              </Card.Content>
            </Card>
          </Animatable.View>
        )}

        <Animatable.View animation="fadeInUp" delay={160} style={{ flexDirection: 'row', columnGap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          {meal.strYoutube && (
            <Button mode="contained" icon="youtube" buttonColor="#7A0A0A" onPress={() => open(meal.strYoutube)}>
              Ver en YouTube
            </Button>
          )}
          {meal.strSource && (
            <Button mode="contained-tonal" icon="link-variant" onPress={() => open(meal.strSource)}>
              Fuente
            </Button>
          )}
        </Animatable.View>

        <Animatable.View animation="zoomIn" delay={220} style={{ alignItems: 'center', marginTop: 14 }}>
          <Button
            mode="elevated"
            icon="dice-5-outline"
            onPress={loadRandom}
            style={{ borderRadius: 999 }}
            contentStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
            buttonColor="#111"
            textColor="#fff"
          >
            Cargar otro platillo random
          </Button>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

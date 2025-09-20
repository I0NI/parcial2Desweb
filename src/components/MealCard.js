import React from 'react';
import * as Animatable from 'react-native-animatable';
import { Card, Text, Avatar, IconButton } from 'react-native-paper';
import { View } from 'react-native';

export default function MealCard({ meal, onPress, index = 0 }) {
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={Math.min(index * 70, 500)}
      duration={420}
      useNativeDriver
      style={{ width: '100%' }}
    >
      <Card mode="elevated" onPress={onPress} style={{ marginVertical: 8, borderRadius: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
          <Avatar.Image size={56} source={{ uri: meal.strMealThumb }} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text variant="titleMedium" style={{ fontWeight: '800' }} numberOfLines={1}>
              {meal.strMeal}
            </Text>
            <Text variant="bodySmall" style={{ opacity: 0.7 }}>
              {meal.strCategory || 'Meal'}
            </Text>
          </View>
          <IconButton icon="chevron-right" size={26} iconColor="#C1C1C1" />
        </View>
      </Card>
    </Animatable.View>
  );
}

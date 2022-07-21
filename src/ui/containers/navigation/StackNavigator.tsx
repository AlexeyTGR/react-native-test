import React from 'react';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonInfo from '../../screens/pokemons/PokemonInfo';
import PokemonsList from '../../screens/pokemons/PokemonsList';

export type RootStackParamList = {
  'Pokemon information': {
    options: NativeStackNavigationOptions;
  };
  'Pokemons list': {
    options: NativeStackNavigationOptions;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokemons list"
        component={PokemonsList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pokemon information"
        component={PokemonInfo}
        options={{ title: '...' }}
      />
    </Stack.Navigator>
  )
};

export default StackNavigator;

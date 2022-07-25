import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonInfo from '../../screens/pokemons/PokemonInfo';
import PokemonsList from '../../screens/pokemons/PokemonsList';

export type RootStackParamListType = {
  'Pokemon information': {
    address: string;
  };
  'Pokemons list': undefined;
};

const Stack = createNativeStackNavigator<RootStackParamListType>();

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
  );
};

export default StackNavigator;

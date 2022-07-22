import React, { memo }  from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AllPokemonsListType } from './PokemonsList';
import { RootStackParamList } from '../../containers/navigation/StackNavigator';
import PokemonsListStyles from './PokemonsList.styles';

type Props = {
  item: AllPokemonsListType
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Pokemons list'>

const PokemonItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<NavigationProp>()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pokemon information', { address: item.url });
      }}
    >
      <View
        style={PokemonsListStyles.container}
      >
        <Image
          source={{ uri: item.img }}
          style={PokemonsListStyles.tumbnail}
        />

        <View>
          <Text style={PokemonsListStyles.item__text}>
            {item.name}
          </Text>
          <Text style={PokemonsListStyles.features}>
            features:
          </Text>
          <View style={PokemonsListStyles.featuresList}>
            {item.features.map((item, index) => (
              <Text
                style={PokemonsListStyles.label}
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonItem);
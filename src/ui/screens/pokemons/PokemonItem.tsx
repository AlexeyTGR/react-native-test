import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AllPokemonsListType } from './PokemonsList';
import type { RootStackParamListType } from '../../containers/navigation/StackNavigator';
import PokemonsListStyles from './PokemonsList.styles';
import CustomText from '../../components/CustomTextComp';

type PropsType = {
  item: AllPokemonsListType;
};

type NavigationPropType = NativeStackNavigationProp<
  RootStackParamListType,
  'Pokemons list'
>;

const PokemonItem: React.FC<PropsType> = ({ item }) => {
  const navigation = useNavigation<NavigationPropType>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pokemon information', { address: item.url });
      }}
    >
      <View style={PokemonsListStyles.container}>
        <Image source={{ uri: item.img }} style={PokemonsListStyles.tumbnail} />

        <View>
          <CustomText style={PokemonsListStyles.item__text}>
            {item.name}
          </CustomText>
          <CustomText style={PokemonsListStyles.features}>
            features:
          </CustomText>
          <View style={PokemonsListStyles.featuresList}>
            {item.features.map((item) => (
              <CustomText
                style={PokemonsListStyles.label}
                key={item}
              >
                {item}
              </CustomText>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonItem);

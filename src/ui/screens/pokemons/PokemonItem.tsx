import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {AllPokemonsListType} from './PokemonsList';
import type {RootStackParamList} from '../../containers/navigation/StackNavigator';
import PokemonsListStyles from './PokemonsList.styles';
import CustomText from '../../components/CustomTextComp';

type Props = {
  item: AllPokemonsListType;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Pokemons list'
>;

const PokemonItem: React.FC<Props> = ({item}) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pokemon information', {address: item.url});
      }}
>
      <View style={PokemonsListStyles.container}>
        <Image source={{uri: item.img}} style={PokemonsListStyles.tumbnail} />

        <View>
          <CustomText
            style={PokemonsListStyles.item__text}
            children={item.name}
          />
          <CustomText
            style={PokemonsListStyles.features}
            children="features:"
          />
          <View style={PokemonsListStyles.featuresList}>
            {item.features.map((item, index) => (
              <CustomText
                style={PokemonsListStyles.label}
                key={index}
                children={item}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(PokemonItem);

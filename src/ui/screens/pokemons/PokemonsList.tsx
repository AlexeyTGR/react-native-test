import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItem, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import pokemonApi from '../../../api/pokemonApi';
import PokemonsListStyles from './PokemonsList.styles';

type PropsType = {
  navigation: NativeStackNavigationHelpers;
}

export type AllPokemonsListType = {
  name: string;
  url: string;
  img: string;
  pokemonId: number;
  features: string[];
}

const PokemonsList: React.FC<PropsType> = (props) => {
  const [pokemons, setPokemons] = useState<AllPokemonsListType[]>([]);
  const [nextItemsUrl, setNextItemsUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const getPokemonsList = async (url: string) => {
    try {
      setIsLoading(true);
      const result = await pokemonApi.getAllPokemons(url);
      Promise.all<AllPokemonsListType[]>(
        result.data.results.map(async (item: AllPokemonsListType) => {
          const response = await pokemonApi.getPokemonInfo(item.url);
          return {
            ...item,
            img: response.data.sprites.front_default,
            pokemonId: response.data.id,
            features: response.data.types.map((item: any) => item.type.name)
          }
        })).then((updatedPokemons) => {
          setPokemons([...pokemons, ...updatedPokemons]);
          setIsLoading(false);
        });

      setNextItemsUrl(result.data.next);
    } catch (err) {
      setIsLoading(false);
      console.log('>>> ERROR >>>', err);
    };
  };

  useEffect(() => {
    getPokemonsList('');
  }, []);

  const onEndReached = async () => {
    setIsLoading(true);
    await getPokemonsList(nextItemsUrl);
    setIsLoading(false);
  };

  const renderLoading = () => {
    if (!isLoading) {
      return null
    }

    return (
      <View
        style={PokemonsListStyles.loader}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const renderItem: ListRenderItem<AllPokemonsListType> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Pokemon information', { adress: item.url });
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
            <FlatList
              data={item.features}
              renderItem={({ item }) => (
                <Text style={PokemonsListStyles.label}>
                  {item}
                </Text>
              )}
              horizontal={true}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return (
      <View
        style={PokemonsListStyles.separator}
      />
    );
  };

  return (
    <SafeAreaView>

      <FlatList
        data={pokemons}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={
          <Text style={PokemonsListStyles.title}>
            POKEMONS
          </Text>
        }
        ListFooterComponent={renderLoading}
        getItemLayout={(data, index) => (
          { length: 60, offset: 60 * index, index }
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

export default PokemonsList;

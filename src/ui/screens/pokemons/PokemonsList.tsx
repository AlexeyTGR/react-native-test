import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, SafeAreaView, Text, View } from 'react-native';
import PokemonItem from './PokemonItem';
import pokemonApi from '../../../api/pokemonApi';
import PokemonsListStyles from './PokemonsList.styles';
import CustomText from '../../components/CustomTextComp';

export type AllPokemonsListType = {
  name: string;
  url: string;
  img: string;
  pokemonId: number;
  features: string[];
}

const renderItem: ListRenderItem<AllPokemonsListType> = ({ item }) => {
  return <PokemonItem item={item} />
};

const renderSeparator = () => {
  return (
    <View
      style={PokemonsListStyles.separator}
    />
  );
};

const PokemonsList = () => {
  const [pokemons, setPokemons] = useState<AllPokemonsListType[]>([]);
  const [nextItemsUrl, setNextItemsUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const isSearching = React.useRef(false);
  const getPokemonsList = async (url: string) => {

    if (isSearching.current) {
      return;
    }
    isSearching.current = true;
    try {
      setIsLoading(true);

      const result = await pokemonApi.getAllPokemons(url);

      const updatedPokemons = await Promise.all<AllPokemonsListType[]>(
        result.data.results.map(async (item: AllPokemonsListType) => {
          const response = await pokemonApi.getPokemonInfo(item.url);
          return {
            ...item,
            img: response.data.sprites.front_default,
            pokemonId: response.data.id,
            features: response.data.types.map((item: any) => item.type.name)
          };
        })
      );

      setPokemons([...pokemons, ...updatedPokemons]);
      setNextItemsUrl(result.data.next);
    } catch (err) {
      console.log('>>> ERROR >>>', err);
    } finally {
      isSearching.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemonsList('');
  }, []);

  const onEndReached = async () => {
    await getPokemonsList(nextItemsUrl);
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

  return (
    <SafeAreaView>
      <FlatList
        data={pokemons}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={(
          <CustomText 
            style={PokemonsListStyles.title}
            children='POKEMONS'
          />
        )}
        ListFooterComponent={renderLoading}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default PokemonsList;

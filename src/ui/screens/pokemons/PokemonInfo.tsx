import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItem, Image, Text, View, Keyboard, SafeAreaView } from "react-native";
import pokemonApi from "../../../api/pokemonApi";
import { RootStackParamList } from "../../containers/navigation/StackNavigator";
import PokemonInfoStyles from './PokemonInfo.styles';


export type PokemonStatsType = {
  base_stat: number;
  stat: {
    name: string;
  };
}

export type PokemonType = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    fine: string;
    other: {
      dream_world: {
        front_default: string;
      }
    }
  };
  height: number;
  weight: number;
  stats: PokemonStatsType[];
  types: {
    type: {
      name: string;
    }
  }[];
}

type TestType = {
  name: string;
  value: number | string;
}

const PokemonInfo: React.FC<NativeStackScreenProps<RootStackParamList, 'Pokemon information'>> = (props: any) => {
  const [pokemon, setPokemon] = useState<PokemonType | null>();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await pokemonApi.getPokemonInfo(props.route.params?.adress);
      setTimeout(() => {
        result.data.sprites.fine = result.data.sprites.other.dream_world.front_default;
        
        setPokemon(result.data)
        setImages([
          result.data.sprites.front_default, 
          result.data.sprites.back_default, 
          result.data.sprites.other.dream_world.front_default,
        ])
      }, 1000)
      props.navigation.setOptions({
        title: result.data.name,
      })
    })();
  }, [setPokemon]);

  if (!pokemon) {
    return (
      <View style={PokemonInfoStyles.loader}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };



  const generalInfo: TestType[] = [
    {
      name: 'height;',
      value: pokemon.height,
    },
    {
      name: 'width:',
      value: pokemon.weight,
    },
    {
      name: 'features:',
      value: pokemon.types.map(item => item.type.name).join(', '),
    },
  ];

  return (
    <SafeAreaView style={PokemonInfoStyles.main}>
      <View style={PokemonInfoStyles.main}>

        <View style={PokemonInfoStyles.main}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={PokemonInfoStyles.img}
          />
          <Text style={PokemonInfoStyles.title}>
            {pokemon.name}
          </Text>
        </View>

        <View style={[PokemonInfoStyles.info, PokemonInfoStyles.main]}>
          <FlatList
            data={generalInfo}
            renderItem={({ item }) => (
              <View style={PokemonInfoStyles.stats}>
                <Text>{item.name}</Text>
                <Text style={PokemonInfoStyles.stats__value}>{item.value}</Text>
              </View>
            )}
          />

          <FlatList
            data={pokemon.stats}
            renderItem={({ item }) => (
              <View style={PokemonInfoStyles.stats}>
                <Text>
                  {item.stat.name}:
                </Text>
                <Text style={PokemonInfoStyles.stats__value}>
                  {item.base_stat}
                </Text>
              </View>
            )}
            ListHeaderComponent={(
              <Text style={PokemonInfoStyles.stats__header}>
                Stats:
              </Text>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PokemonInfo;

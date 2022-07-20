import axios, { AxiosResponse } from 'axios';
import { AllPokemonsListType } from '../ui/screens/pokemons/PokemonsList';

const getAllPokemons = (url: string) => {
  if (!url) {
    url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=15'
  }
  
  return axios.get(url);
};

const getPokemonInfo = (url: string) => {
  return axios.get(url);
};

export default {
  getAllPokemons,
  getPokemonInfo,
};

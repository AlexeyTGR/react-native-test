import { StyleSheet } from 'react-native';

const PokemonInfoStyles = StyleSheet.create({
  main: {
    flex: 1,
  },

  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  title: {
    fontSize: 20,
    alignSelf: 'center',
  },

  info: {
    marginHorizontal: '20%',
    paddingVertical: 10,
  },

  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  stats__value: {
    textAlign: 'right',
  },

  stats__header: {
    textAlign: 'center',
  },

  loader: {
    paddingTop: 250,
  },
});

export default PokemonInfoStyles;

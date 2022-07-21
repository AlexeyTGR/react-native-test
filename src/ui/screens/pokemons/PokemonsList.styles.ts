import { StyleSheet } from 'react-native';

const PokemonsListStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  title: {
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 30,
  },

  item__text: {
    paddingTop: 10,
    fontSize: 22,
    textTransform: 'capitalize',
  },

  loader: {
    height: 120,
    paddingVertical: 30,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },

  tumbnail: {
    width: 120,
    height: 120,
    margin: 10,
  },

  separator: {
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 20,
  },

  features: {
    marginTop: 45,
    marginBottom: 5,
  },
  
  label: {
    backgroundColor: 'lightslategrey',
    textAlign: 'center',
    color: 'white',
    width: 60,
    height: 23,
    marginRight: 10,
  }
});

export default PokemonsListStyles;

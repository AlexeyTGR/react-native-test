import React from 'react';
import { Text, View, StyleSheet, TouchableHighlightBase } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.main}>
      <TouchableHighlightBase>
        <Text>
          Sign in
        </Text>
      </TouchableHighlightBase>
      <TouchableHighlightBase>
        <Text>
          All pokemons
        </Text>
      </TouchableHighlightBase>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Footer;

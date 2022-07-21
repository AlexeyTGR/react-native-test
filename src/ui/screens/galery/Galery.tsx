import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { FlatList, Image, ListRenderItem, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GaleryStyles from './Galery.styles';

const Galery = () => {
  const [img, setImg] = useState<string[]>();

  (async () => {
    try {
      const value = await AsyncStorage.getItem('GalleryPhotos');
      if (value !== null) {
        const photos = JSON.parse(value);
        setImg(photos);
      }
    } catch (e) {
      console.log('getData error >', e);
    };
  })();

  const renderImg: ListRenderItem<string> = ({ item }) => {
    return (
      <View style={GaleryStyles.container}>
        <Image source={{ uri: item }} style={GaleryStyles.img} />
      </View>
    );
  };

  const renderSeparator = () => {
    return (
      <View
        style={GaleryStyles.separator}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={img}
        renderItem={renderImg}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

export default Galery;

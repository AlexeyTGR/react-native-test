import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { FlatList, Image, ListRenderItem, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SomeScreen = () => {
  const [img, setImg] = useState<string[]>();

  (async () => {
    try {
      const value = await AsyncStorage.getItem('GalleryPhotos')
      if (value !== null) {
        const photos = JSON.parse(value)
        setImg(photos)
      }
    } catch (e) {
      console.log('getData error >', e);
    }
  })();

  const renderImg: ListRenderItem<string> = ({ item }) => {
    return (
      <View style={{ alignSelf: 'center' }}>
        <Image source={{ uri: item }} style={{ width: 300, height: 400 }} />
      </View>
    )
  };

  const renderSeparator = () => {
    return (
      <View
        style={{ height: 10, backgroundColor: '#CED0CE' }}
      />
    );
  };

  return (
    <SafeAreaView>
      <Text>Some interesting information</Text>
      <FlatList
        data={img}
        renderItem={renderImg}
        ItemSeparatorComponent={renderSeparator}
      />
    </SafeAreaView>
  );
};

export default SomeScreen;

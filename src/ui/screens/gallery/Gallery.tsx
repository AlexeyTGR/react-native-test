import React, { useEffect, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '../../../store';
import CustomText from '../../components/CustomTextComp';
import GalleryStyles from './Gallery.styles';

const Galery = () => {
  const [img, setImg] = useState<string[]>();
  const images = useAppSelector((state) => state.galleryReducer.images);

  useEffect(() => {
    if (images.length > 0) {
      setImg(images);
    }
  }, [images]);

  const renderImg: ListRenderItem<string> = ({ item }) => {
    return (
      <View style={GalleryStyles.container}>
        <Image
          source={{ uri: item }}
          style={GalleryStyles.img}
        />
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={GalleryStyles.separator} />;
  };

  return (
    <SafeAreaView>
      {(img && img.length > 0)
        ? (<FlatList
          data={img}
          renderItem={renderImg}
          ItemSeparatorComponent={renderSeparator}
        />)
        : <CustomText>No photo yet...</CustomText>}
    </SafeAreaView>
  );
};

export default Galery;

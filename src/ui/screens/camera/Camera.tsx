import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { RNCamera, FaCC } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

import CameraStyles from './Camera.styles';

type PropsType = {
  navigation: NativeStackNavigationHelpers;
}

const Camera: React.FC<PropsType> = (props) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [lastPhoto, setLastPhoto] = useState<string>('');
  const [isBackCamType, setIsBackCamType] = useState<boolean>(true);

  const takePicture = async (camera: RNCamera) => {
    try {
      const options = { quality: 0.5, base64: false };
      const data = await camera.takePictureAsync(options);
      const filePath = data.uri;
      setLastPhoto(filePath);
      const updatedPhotos = [...photos, filePath];
      setPhotos(updatedPhotos);

      await AsyncStorage.setItem('GalleryPhotos', JSON.stringify(updatedPhotos));
    } catch (error) {
      console.log(error);
    };
  };

  const changeCameraType = () => {
    setIsBackCamType(!isBackCamType);
  };

  return (
    <View style={CameraStyles.container}>
      <RNCamera
        style={CameraStyles.preview}
        type={isBackCamType ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {(({ camera, status }: keyof FaCC): JSX.Element => {
          if (status !== 'READY') {
            return <Text>Loading...</Text>;
          }
          return (
            <View style={CameraStyles.buttons}>
              {lastPhoto ?
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Gallery')}
                  style={CameraStyles.thumbnail}
                >
                  <Image
                    source={{ uri: lastPhoto }}
                    style={CameraStyles.thumbnail}
                  />
                </TouchableOpacity>
                : <View style={CameraStyles.thumbnail} />
              }

              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={CameraStyles.capture}
              >
                <View style={CameraStyles.snap} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={changeCameraType}
                style={CameraStyles.capture}
              >
                <View style={CameraStyles.reverse} />
              </TouchableOpacity>
            </View>
          );
          // Error in the package's types
        }) as unknown as React.ReactNode}
      </RNCamera>
    </View>
  )
};

export default Camera;
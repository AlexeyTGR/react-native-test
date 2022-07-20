import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, CameraRoll, ViewProps } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNCamera, FaCC } from "react-native-camera";
import { NativeStackNavigationHelpers } from "@react-navigation/native-stack/lib/typescript/src/types";

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
      const updatedPhotos = [...photos, filePath]
      setPhotos(updatedPhotos);

      await AsyncStorage.setItem('GalleryPhotos', JSON.stringify(updatedPhotos))
    } catch (error) {
      console.log(error);
    }
  };

  const changeCameraType = () => {
    setIsBackCamType(!isBackCamType);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={isBackCamType ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {/* {((params: Parameters<FaCC>): JSX.Element => (
          <View>
            <Text>
              ASDadas
            </Text>
          </View>
          // Error in the package's types
        )) as unknown as React.ReactNode} */}
        {(({ camera, status }: keyof FaCC): JSX.Element => {
          // const { camera, status } = params[0];
          if (status !== 'READY') {
            return <Text>Loading...</Text>;
          }
          return (
            <View style={styles.buttons}>
              {lastPhoto ?
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Gallery')}
                  style={styles.thumbnail}
                >
                  <Image
                    source={{ uri: lastPhoto }}
                    style={styles.thumbnail}
                  />
                </TouchableOpacity>
                : <View style={styles.thumbnail} />
              }

              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}
              >
                <View style={styles.snap} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={changeCameraType}
                style={styles.capture}
              >
                <View style={styles.reverse} />
              </TouchableOpacity>
            </View>
          );
        }) as unknown as React.ReactNode}
      </RNCamera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    alignSelf: 'center',
    marginVertical: 30,
  },
  snap: {
    width: 20,
    height: 20,
  },
  reverse: {
    width: 1,
    height: 1,
  },
  thumbnail: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
});

export default Camera;

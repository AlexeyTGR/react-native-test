import React, { useState } from 'react';
import { View, TouchableOpacity, Image, PermissionsAndroid, Platform } from 'react-native';
import type { FaCC } from 'react-native-camera';
import { RNCamera } from 'react-native-camera';
import type { NativeStackNavigationHelpers } from '@react-navigation/native-stack/lib/typescript/src/types';

import CameraRoll from '@react-native-community/cameraroll';
import CameraStyles from './Camera.styles';
import CustomText from '../../components/CustomTextComp';
import { useAppDispatch } from '../../../store';
import { setImages } from '../../../store/galleryReducers';


type PropsType = {
  navigation: NativeStackNavigationHelpers;
};

const hasAndroidPermission = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};

const savePicture = async (tag: string, type: 'photo' | 'video', album: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(tag, { type, album });
};

const Camera: React.FC<PropsType> = (props) => {
  const [lastPhoto, setLastPhoto] = useState<string>('');
  const [isBackCamType, setIsBackCamType] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const takePicture = async (camera: RNCamera) => {
    try {
      const options = { quality: 0.5, base64: false };
      const data = await camera.takePictureAsync(options);
      const filePath = data.uri;
      setLastPhoto(filePath);

      dispatch(setImages(filePath));

      await savePicture(filePath, 'photo', 'My React Native test app');
    } catch (error) {
      console.log(error);
    }
  };

  const changeCameraType = () => {
    setIsBackCamType(!isBackCamType);
  };

  return (
    <View style={CameraStyles.container}>
      <RNCamera
        style={CameraStyles.preview}
        type={
          isBackCamType
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {
          // eslint-disable-next-line no-undef
          (({ camera, status }: keyof FaCC): JSX.Element => {
            if (status !== 'READY') {
              return <CustomText>Loading...</CustomText>;
            }
            return (
              <View style={CameraStyles.buttons}>
                {lastPhoto ? (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Gallery')}
                    style={CameraStyles.thumbnail}
                  >
                    <Image
                      source={{ uri: lastPhoto }}
                      style={CameraStyles.thumbnail}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={CameraStyles.thumbnail} />
                )}

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
          }) as unknown as React.ReactNode
        }
      </RNCamera>
    </View>
  );
};

export default Camera;

import { StyleSheet } from 'react-native';

const CameraStyles = StyleSheet.create({
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

export default CameraStyles;
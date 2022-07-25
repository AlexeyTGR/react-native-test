import { StyleSheet } from 'react-native';

const signInStyles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'gainsboro',
  },

  img: {
    flex: 1,
    alignSelf: 'center',
    width: 300,
    height: 150,
    resizeMode: 'center',
  },

  form: {
    flex: 1,
    marginHorizontal: '20%',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    paddingVertical: 0,
    marginVertical: 10,
  },

  forgotPassword: {
    marginTop: 5,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: '500',
  },

  button: {
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'grey',
  },

  button__content: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default signInStyles;

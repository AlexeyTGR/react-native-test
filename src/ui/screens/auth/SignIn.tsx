import React from 'react';
import { View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';

import signInStyles from './SignIn.styles';
import images from '../../assets/images';

const SignIn = () => {
  return (
    <View style={signInStyles.main}>
      <Image source={images.logo} style={signInStyles.img} />
      <View style={signInStyles.form}>
        <TextInput
          placeholder='USERNAME'
          style={signInStyles.input}
        />
        <TextInput
          placeholder='PASSWORD'
          style={signInStyles.input}
        />
        <TouchableWithoutFeedback
          onPress={() => console.log('handle password reset')}
        >
          <Text style={signInStyles.forgotPassword}>
            FORGOT PASSWORD
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => console.log('handle sign in')}
        >
          <View style={signInStyles.button}>
            <Text style={signInStyles.button__content}>
              SIGN IN
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SignIn;

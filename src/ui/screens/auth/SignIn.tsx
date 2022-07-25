import React from 'react';
import { View, Image, TextInput, TouchableWithoutFeedback } from 'react-native';

import signInStyles from './SignIn.styles';
import images from '../../assets/images';
import CustomText from '../../components/CustomTextComp';

const SignIn = () => {
  return (
    <View style={signInStyles.main}>
      <Image source={images.logo} style={signInStyles.img} />
      <View style={signInStyles.form}>
        <TextInput placeholder="USERNAME" style={signInStyles.input} />
        <TextInput placeholder="PASSWORD" style={signInStyles.input} />
        <TouchableWithoutFeedback
          onPress={() => console.log('handle password reset')}
        >
          <CustomText style={signInStyles.forgotPassword}>
            FORGOT PASSWORD
          </CustomText>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('handle sign in')}>
          <View style={signInStyles.button}>
            <CustomText style={signInStyles.button__content}>
              SIGN IN
            </CustomText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default SignIn;

import React from 'react';
import type { TextProps } from 'react-native';
import { StyleSheet , Text } from 'react-native';

const CustomText: React.FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[style.text, props.style]}
    />
  );
};

export default CustomText;

const style = StyleSheet.create({
  text: {
    fontFamily: 'MochiyPopOne-Regular',
  },
});

import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText: React.FC<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[{ fontFamily: 'MochiyPopOne-Regular' }, props.style]}
    />
  );
};

export default CustomText;
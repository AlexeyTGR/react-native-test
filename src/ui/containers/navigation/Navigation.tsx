import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigations from './TabNavigations';
import SignIn from '../../screens/auth/SignIn';

const Drawer = createDrawerNavigator();

const Navigation = () => {

  return (
    <Drawer.Navigator
      initialRouteName="Content"
    >
      <Drawer.Screen
        name="Sign in"
        component={SignIn} />
      <Drawer.Screen
        name="Content"
        component={TabNavigations}
        options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
};

export default Navigation;

import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StackNavigator from './StackNavigator';
import SignIn from '../../screens/auth/SignIn';
import Camera from '../../screens/camera';
import Gallery from '../../screens/gallery/Gallery';

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Pokemons"
      tabBar={() => null}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="SignIn" component={SignIn} />
      <Tab.Screen name="Pokemons" component={StackNavigator} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Gallery" key="gallery" component={Gallery} />
    </Tab.Navigator>
  );
};

export default Navigation;

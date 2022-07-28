import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Graph from '../../screens/tests/Graph';
import Component from '../../screens/tests/useThemeExample';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Graph">
      <Tab.Screen name="Graph" component={Graph} />
      <Tab.Screen name="ThemeTest" component={Component} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

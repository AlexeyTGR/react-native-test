import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Camera from "../../screens/Camera";
import SomeScreen from "../../screens/SomeScreen";
import StackNavigator from "./StackNavigator";

const Tab = createMaterialTopTabNavigator();

const TabNavigations = () => {
  return (
    <Tab.Navigator
      initialRouteName="Pokemons"
      tabBar={() => null}
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >

      <Tab.Screen name="Gallery" key="gallery" component={SomeScreen} />
      <Tab.Screen name="Pokemons" component={StackNavigator} />
      <Tab.Screen name="Camera" component={Camera} />

    </Tab.Navigator>
  )
}

export default TabNavigations;

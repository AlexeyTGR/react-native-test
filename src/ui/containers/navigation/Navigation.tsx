import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SignIn from "../../screens/auth/SignIn";
import Camera from "../../screens/Camera";
import SomeScreen from "../../screens/SomeScreen";
import StackNavigator from "./StackNavigator";

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
      <Tab.Screen name="SignIn" component={SignIn}/>
      <Tab.Screen name="Pokemons" component={StackNavigator} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Gallery" key="gallery" component={SomeScreen} />

    </Tab.Navigator>
  )
}

export default Navigation;

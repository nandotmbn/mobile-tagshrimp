import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CameraView from '../screens/active/camera-view';
import Home from '../screens/active/home';
import PlansTab from '../screens/active/plans';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animationEnabled: false}}>
      <Stack.Screen name="Overview" component={Home} />
      <Stack.Screen name="Camera" component={CameraView}/>
      <Stack.Screen name="Plan" component={PlansTab}/>
    </Stack.Navigator>
  );
}

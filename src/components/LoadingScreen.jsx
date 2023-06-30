import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import tailwind from 'twrnc';

function LoadingScreen(props) {
  return (
    <View
        style={tailwind`w-full h-full items-center justify-center bg-white`}>
        <ActivityIndicator size={'large'} color="skyblue" />
      </View>
  );
}

export default LoadingScreen;
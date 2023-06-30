import React from 'react';
import { Linking, TouchableOpacity, View, Text } from 'react-native';
import tw from "twrnc"

function OnNotGranted({getPermission}) {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-gray-500`}>Access for camera is not granted</Text>
      <Text style={tw`text-gray-500`}>
        You can activate the camera by setting the access
      </Text>
      <TouchableOpacity
        style={tw`px-4 py-2 mt-2 bg-blue-500 rounded-sm`}
        onPress={() => Linking.openSettings()}>
        <Text style={tw`text-white`}>Open Setting</Text>
      </TouchableOpacity>

      <Text style={tw`text-gray-500 mt-4`}>Then try to restart camera</Text>
      <TouchableOpacity
        style={tw`px-4 py-2 mt-2 bg-blue-500 rounded-sm`}
        onPress={() => getPermission()}>
        <Text style={tw`text-white`}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OnNotGranted;

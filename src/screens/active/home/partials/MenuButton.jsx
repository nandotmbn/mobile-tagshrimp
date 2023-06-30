import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Entypo from "react-native-vector-icons/Entypo"
import tw from "twrnc"

function MenuButton({navigation}) {
  return (
    <View style={tw`flex-row items-center justify-evenly mt-6`}>
      <TouchableOpacity style={tw`h-18 w-18 mx-2 items-center`}>
        <MaterialCommunityIcons size={22} color="black" name="account" />
        <Text style={tw`text-xs text-black text-center`}>Providers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`h-18 w-18 mx-2 items-center`}>
        <FontAwesome size={22} color="black" name="history" />
        <Text style={tw`text-xs text-black text-center`}>Histories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`h-18 w-18 mx-2 items-center`}>
        <Entypo size={22} color="black" name="line-graph" />
        <Text style={tw`text-xs text-black text-center`}>Statistics</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MenuButton;

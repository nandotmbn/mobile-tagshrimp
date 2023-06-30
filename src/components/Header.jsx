import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Header({title, navigation}) {
  return (
    <View style={tw`h-14 bg-blue-500 w-full flex flex-row items-center px-4`}>
      <TouchableOpacity style={tw`mr-4`} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={30} />
      </TouchableOpacity>
      <Text style={tw`text-white font-bold text-xl`}>{title}</Text>
    </View>
  );
}

export default Header;

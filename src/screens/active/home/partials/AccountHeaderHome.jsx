import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function AccountHeaderHome({navigation}) {
  return (
    <View
      style={tw`flex-3 bg-white rounded-xl h-full mx-1 flex-col justify-start items-center border-green-300 border-4 p-2`}>
      <View style={tw`flex-row items-center mt-1`}>
        <View style={tw`flex-2`}>
          <View
            style={tw`rounded-full bg-gray-200 h-16 w-16 mr-2 items-center`}>
            <MaterialCommunityIcons name="account" size={60} />
          </View>
        </View>
        <View style={tw`flex-col flex-5`}>
          <Text style={tw`text-gray-900 text-sm font-bold`}>
            Orlando Pratama Tambunan
          </Text>
          <Text style={tw`text-gray-500 text-xs font-light`}>nandotmbn</Text>
        </View>
      </View>
      <View style={tw`flex-row items-center mt-2 self-start ml-2`}>
        <FontAwesome5 name="crown" color="gold" size={25} />
        <Text style={tw`text-yellow-400 ml-2`}>Akun Enterprise</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Plan")}
        style={tw`flex-row items-center self-center mt-2 self-start justify-center border-2 border-purple-600 rounded-2xl w-full items-center p-2`}>
        <FontAwesome name="tags" size={24} color="purple" />
        <Text style={tw`text-purple-400 ml-2`}>Tingkatkan plan</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AccountHeaderHome;

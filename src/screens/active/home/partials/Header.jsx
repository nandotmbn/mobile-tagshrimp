import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AccountHeaderHome from './AccountHeaderHome';

function Header({navigation}) {
  return (
    <View style={tw`h-64 px-2 py-4 flex-row items-center`}>
      <AccountHeaderHome navigation={navigation} />
      <View style={tw`flex-col flex-1`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          style={tw`flex-1 mb-1 bg-white rounded-xl h-full mx-1 justify-center items-center border-purple-300 border-4`}>
          <MaterialCommunityIcons name='monitor-dashboard' style={tw`text-gray-400`} size={40} />
          <Text style={tw`text-gray-400 text-sm`}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Camera')}
          style={tw`flex-1 mt-1 bg-white rounded-xl h-full mx-1 justify-center items-center border-purple-300 border-4`}>
          <Image
            source={require('../../../../assets/count_img_icon.png')}
            style={tw`h-10 w-10 bg-transparent`}
          />
          <Text style={tw`text-gray-400 text-sm`}>Hitung</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

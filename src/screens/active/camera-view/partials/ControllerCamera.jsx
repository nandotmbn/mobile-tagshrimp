import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ControllerCamera({
  setController,
  controller,
  takePhoto,
  lastCount,
  totalCount,
  isCounting,
  setLastCount,
  setTotalCount,
  setSaving,
  navigation
}) {
  return (
    <View
      style={tw`absolute bottom-0 top-0 rounded-top h-full w-full justify-end`}>
      <View
        style={tw`h-24 w-full bg-black bg-opacity-30 items-center justify-evenly flex-row px-4`}>
        <View style={tw`flex-1 items-start`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-100 text-sm`}>
              Perhitungan terakhir :{' '}
            </Text>
            <Text style={tw`text-gray-100 text-sm`}>{lastCount} </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-100 text-sm`}>Total perhitungan : </Text>
            <Text style={tw`text-gray-100 text-sm`}>{totalCount} </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-gray-100 text-sm`}>Kuota : </Text>
            <Text style={tw`text-gray-100 text-sm`}>Tak terbatas </Text>
          </View>
        </View>
        <View style={tw`flex-1 items-center`}>
          {isCounting ? (
            <View
              onPress={() => takePhoto()}
              style={tw`w-13 h-13 rounded-full bg-transparent border-4 border-gray-700 items-center justify-center`}>
              <View style={tw`w-10 h-10 rounded-full bg-gray-700`}></View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => takePhoto()}
              style={tw`w-13 h-13 rounded-full bg-transparent border-4 border-gray-700 items-center justify-center`}>
              <View style={tw`w-10 h-10 rounded-full bg-red-700`}></View>
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`flex-1 flex-row justify-center items-end`}>
          <View>
            <TouchableOpacity
              onPress={() =>
                setController({
                  ...controller,
                  flash: !controller.flash,
                })
              }
              style={tw`w-8 h-8 my-1 mx-1 rounded-full bg-transparent border-4 border-white items-center justify-center`}>
              {controller.flash ? (
                <Ionicons name="flash" color="white" size={20} />
              ) : (
                <Ionicons name="flash-off" color="white" size={20} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setController({
                  ...controller,
                  torch: !controller.torch,
                })
              }
              style={tw`w-8 h-8 my-1 mx-1 rounded-full bg-transparent border-4 border-white items-center justify-center`}>
              {controller.torch ? (
                <MaterialCommunityIcons
                  name="flashlight"
                  color="yellow"
                  size={20}
                />
              ) : (
                <MaterialCommunityIcons
                  name="flashlight-off"
                  color="white"
                  size={20}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setLastCount(0);
                setTotalCount(0);
              }}
              style={tw`h-8 my-1 mx-1 rounded-xl px-4 bg-transparent border-2 border-red-500 items-center justify-center`}>
              <Text style={tw`text-white`}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSaving(true);
                setTimeout(() => {
                  setSaving(false)
                  navigation.navigate("Overview")
                },3000)
              }}
              style={tw`h-8 my-1 mx-1 rounded-xl px-4 bg-transparent border-2 border-green-500 items-center justify-center`}>
              <Text style={tw`text-white`}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ControllerCamera;

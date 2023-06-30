import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import tw from 'twrnc';
import {updateAccessToken} from '../../../state/slices/auth';
import {settingsList} from '../../../static/settings';
import PLANS from './static/plans.json';

function PlansTab() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <StatusBar backgroundColor="#7303fc" />
        <LinearGradient
          colors={['#7e03fc', '#bbebff', '#ffffff']}
          style={tw`h-72`}>
          <View style={tw`mt-4 mx-2`}>
            <Text style={tw`text-2xl font-semibold text-purple-100`}>
              Plans
            </Text>
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={tw`flex-9`}>
        {PLANS?.map((e, i) => {
          return (
            <View
              style={tw`w-11/12 h-48 rounded-xl self-center my-2 p-4 ${e.color} flex-row`}>
              <View style={tw`flex-2`}>
                <Text style={tw`text-2xl text-white font-bold`}>{e.title}</Text>
                <View style={tw`mx-4 mt-2`}>
                  {e?.features.map((el, i) => {
                    return <Text style={tw`text-white mb-1`}>{el}</Text>;
                  })}
                </View>
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`text-white text-xl`}>{e.price}</Text>
                <TouchableOpacity style={tw`p-2 border-2 border-purple-100 bg-white rounded-full mt-4 items-center`}>
                  <Text style={tw`text-black text-xl`}>Beli</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default PlansTab;

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
import NOTIFICATION from './static/notifications.json';

function NotificationTab() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <StatusBar backgroundColor="#7303fc" />
        <LinearGradient
          colors={['#7e03fc', '#bbebff', '#ffffff']}
          style={tw`h-72`}>
          <View style={tw`mt-4 mx-2`}>
            <Text style={tw`text-2xl font-semibold text-purple-100`}>
              Notifikasi
            </Text>
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={tw`flex-9`}>
        {NOTIFICATION?.map((e, i) => {
          return (
            <View
              style={tw`w-11/12 h-32 rounded-xl self-center my-2 p-4 bg-blue-500 flex-row ${e.color}`}>
              <View style={tw`flex-1 items-start justify-center`}>
                <Text style={tw`text-white text-xl font-bold`}>{e?.title}</Text>
              </View>
              <View style={tw`flex-2 ml-4`}>
                {(() => {
                  switch (e.title) {
                    case 'Laporan harian':
                      return (
                        <View style={tw`flex-col`}>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Total sesi per hari:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{e.data.session}</Text>
                          </View>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Total perhitungan per hari:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{e.data.totalCounting}</Text>
                          </View>
                        </View>
                      );

                    case 'Laporan mingguan':
                      return (
                        <View style={tw`flex-col`}>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Total sesi per minggu:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{e.data.session}</Text>
                          </View>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Total perhitungan per minggu:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{e.data.totalCounting}</Text>
                          </View>
                        </View>
                      );

                    case 'Pembelian plan':
                      return (
                        <View style={tw`flex-col`}>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Jenis plan:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>{e?.type}</Text>
                          </View>
                          <View style={tw`mb-2`}>
                            <Text style={tw`text-white`}>Status pembelian:</Text>
                            <Text style={tw`text-white text-2xl font-bold`}>Success</Text>
                          </View>
                        </View>
                      )

                    default:
                      break;
                  }
                })()}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default NotificationTab;

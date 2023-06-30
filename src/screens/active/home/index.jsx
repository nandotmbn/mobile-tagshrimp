import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import Header from './partials/Header';
import MenuButton from './partials/MenuButton';
import DAILYCOUNTING from './static/daily-couting.json';

function Home({navigation}) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <StatusBar backgroundColor="#7303fc" />
      <LinearGradient
        colors={['#7303fc', '#3f57f2', '#95d3ed']}
        style={tw`h-full`}>
        <Header navigation={navigation} />
        <View
          style={tw.style(`flex-3 bg-white`, {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          })}>
          <View style={tw`p-4 mt-5`}>
            <Text style={tw`text-black font-semibold text-sm`}>
              Perhitungan hari ini:{' '}
            </Text>
            <Text style={tw`text-black font-semibold text-2xl`}>
              30 November 2022
            </Text>
          </View>
          {/* <MenuButton /> */}

          <ScrollView
            style={tw.style(`flex-6 bg-white`, {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            })}>
            <View style={tw`p-4 items-center`}>
              {DAILYCOUNTING?.map((e, i) => {
                return (
                  <View
                    style={tw`py-2 w-full bg-purple-700 rounded-2xl mb-2 flex-row`}>
                    <View style={tw`flex-2 items-center justify-center`}>
                      <Text style={tw`text-2xl text-white`}>{e.time}</Text>
                    </View>
                    <View style={tw`flex-3 flex-col justify-center`}>
                      <View style={tw`flex-col my-2`}>
                        <Text style={tw`text-white text-xs`}>Banyak nya perhitungan</Text>
                        <Text style={tw`text-white text-xl font-bold`}>{e.counter} kalkulasi</Text>
                      </View>
                      <View style={tw`flex-col my-2`}>
                        <Text style={tw`text-white text-xs`}>Total benih yang terhitung</Text>
                        <Text style={tw`text-white text-xl font-bold`}>{e.calculatedShrimpTotal} benih</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Home;

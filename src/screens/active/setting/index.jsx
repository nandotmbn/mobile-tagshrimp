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
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { updateAccessToken } from '../../../state/slices/auth';
import {settingsList} from '../../../static/settings';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    if (props?.isModalUp) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
      }).start();

      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  }, [props?.isModalUp]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

function Service() {
  const [isModalUp, setModalUp] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    AsyncStorage.removeItem('token');
    dispatch(updateAccessToken(""));
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView>
        <StatusBar backgroundColor="#7303fc" />
        <LinearGradient
          colors={['#7e03fc', '#bbebff', '#ffebff']}
          style={tw`h-auto`}>
          <View style={tw`bg-transparent px-2 mt-8 flex-row items-center`}>
            <View style={tw`rounded-full bg-red-300 h-24 w-24 mr-2`}></View>
            <View style={tw`flex-col`}>
              <Text style={tw`text-gray-900 text-2xl font-bold`}>
                Orlando Pratama Tambunan
              </Text>
              <Text style={tw`text-gray-500 text-2xl font-light`}>
                nandotmbn
              </Text>
            </View>
          </View>
          <View style={tw`bg-transparent px-2 mt-8 flex-row items-center`}>
            <TouchableOpacity
              style={tw`flex flex-row px-2 py-2 bg-green-400 rounded-2xl items-center justify-center`}>
              <AntDesign name="edit" color="white" size={30} />
              <Text style={tw`ml-2 text-white`}>Ubah Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalUp(!isModalUp)}
              style={tw`flex flex-row px-2 py-2 bg-red-400 rounded-2xl items-center justify-center ml-2`}>
              <AntDesign name="logout" color="white" size={30} />
              <Text style={tw`ml-2 text-white`}>Keluar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={tw`mt-8 px-2`}>
          <Text style={tw`font-bold text-2xl mb-2 text-black`}>Pengaturan</Text>
          {settingsList?.map((e, i) => {
            return (
              <TouchableOpacity
                onPress={() => alert(e)}
                key={i}
                style={tw`py-2 bg-gray-100`}>
                <Text style={tw`text-xl text-black`}>{e}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {isModalUp ? (
        <FadeInView
          isModalUp={isModalUp}
          style={tw`absolute bottom-0 bg-black bg-opacity-40 w-full h-full items-center justify-center`}>
          <View style={tw`w-8/12 h-44 bg-white p-2 rounded-xl items-center justify-center`}>
            <Text style={tw`text-red-500 font-semibold text-center text-xl`}>
              Apakah anda yakin untuk keluar?
            </Text>
            <View style={tw`flex flex-row mt-10`}>
              <TouchableOpacity style={tw`flex-1 mx-2 p-2 bg-green-500`} onPress={logoutHandler}>
                <Text style={tw`text-center text-white`}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`flex-1 mx-2 p-2 bg-red-500`} onPress={() => setModalUp(!isModalUp)}>
                <Text style={tw`text-center text-white`}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </FadeInView>
      ) : null}
    </View>
  );
}

export default Service;

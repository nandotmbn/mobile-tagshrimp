import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import {AuthService} from '../../services/Auth';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from '../../state/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const initMsg = {
  color: '',
  payload: '',
};

function Login({navigation}) {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState(initMsg);

  const handleLogin = async () => {
    setMsg(initMsg);
    let empty = false;
    [(username, password)].forEach(e => {
      if (!e) empty = true;
    });
    if (empty) {
      setMsg({
        color: 'text-red-500',
        payload: 'Isian tidak boleh kosong',
      });

      setTimeout(() => {
        setMsg({
          color: '',
          payload: '',
        });
      }, 2000);
      return;
    }

    setLoading(true);
    try {
      const res = await AuthService.login({username, password});
      if (res.messageType !== 'success') {
        setLoading(false);
        setMsg({
          color: 'text-red-500',
          payload: res.message,
        });

        setTimeout(() => {
          setMsg({
            color: '',
            payload: '',
          });
        }, 2000);
        return;
      }
      AsyncStorage.setItem('token', res.bearerToken);
      dispatch(updateAccessToken(res.bearerToken));
    } catch (error) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <View
          style={tw`items-center justify-center w-full bg-white py-12 flex-1`}>
          <Image
            source={require('../../assets/shrico-logo.png')}
            style={tw`h-32 w-54`}
          />
          <Text style={tw`text-gray-600 mt-4 text-2xl`}>Selamat datang di TagShrimp</Text>
          <Text style={tw`text-gray-600 mb-4 text-xs`}>
            Aplikasi penghitung benih udang
          </Text>
        </View>
        <LinearGradient
          colors={['#7303fc', '#3f57f2', '#95d3ed']}
          style={tw.style(`flex-4 rounded-t-2xl items-center`, {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          })}>
          <ScrollView style={tw`w-9/12 mt-16`}>
            <Text style={tw`text-2xl font-bold text-white`}>Masuk</Text>
            <TextInput
              style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
              placeholder="Nama pengguna"
              placeholderTextColor="white"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
              placeholder="Kata sandi"
              onChangeText={text => setPassword(text)}
              placeholderTextColor="white"
              secureTextEntry={!toggleCheckBox}
            />
            <View style={tw`flex flex-row items-center mt-2`}>
              <CheckBox
                tintColors={{
                  true: '#42f56c',
                  false: '#1a1a1a',
                }}
                disabled={false}
                value={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
              <Text style={tw`text-white font-bold`}>Tampilkan sandi</Text>
            </View>
            {msg.payload ? <Text>{msg.payload}</Text> : null}
            <View style={tw`w-full px-4 mt-8`}>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleLogin}
                style={tw`w-full bg-white items-center py-2 rounded-xl`}>
                {!isLoading ? (
                  <Text style={tw`text-2xl font-bold text-blue-600`}>
                    Masuk
                  </Text>
                ) : (
                  <ActivityIndicator size="small" style={tw`py-1`} />
                )}
              </TouchableOpacity>
            </View>
            <View style={tw`w-full px-4 mt-8 flex-row justify-center`}>
              <Text style={tw`text-lg font-bold text-white mr-2`}>
                Belum punya akun?
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('Register')}>
                <Text style={tw`text-lg font-bold text-black`}>Daftar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

export default Login;

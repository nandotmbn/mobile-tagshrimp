import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import {AuthService} from '../../services/Auth';
import LinearGradient from 'react-native-linear-gradient';

LogBox.ignoreAllLogs();
const initMsg = {
  color: '',
  payload: '',
};

function Register({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    color: '',
    payload: '',
  });

  const handleRegister = async () => {
    // console.log(firstName, lastName, username, email, password, passwordConfirmation);
    setMsg(initMsg);
    let empty = false;
    [firstName, lastName, username, email, password, passwordConfirmation].forEach(e => {
      if (!e) empty = true;
    });
    if (empty)
      return setMsg({
        color: 'text-red-500',
        payload: 'Isian tidak boleh kosong',
      });
    if (password !== passwordConfirmation)
      return setMsg({
        color: 'text-red-500',
        payload: 'Password dan konfirmasi tidak sama',
      });
    setLoading(true);
    try {
      const res = await AuthService.register({
        firstName,
        lastName,
        username,
        email,
        type: 'user',
        password,
      });
      if(!res) return setLoading(false)
      if (res.type === 'error') {
        setLoading(false);
        return setMsg({
          color: 'text-red-500',
          payload: res.message,
        });
      }
      setMsg({
        color: 'text-green-500',
        payload: res.message + ', tunggu sebentar.',
      });

      setTimeout(() => {
        navigation.replace('Login');
      }, 1500);
    } catch (error) {
      return setMsg({
        color: 'text-red-500',
        payload: 'Something failed',
      });
    }
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
            <Text style={tw`text-2xl font-bold text-white`}>Daftar</Text>
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
                placeholder="Nama depan"
                placeholderTextColor="lightgray"
                onChangeText={text => setFirstName(text)}
              />
              <TextInput
                style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
                placeholder="Nama belakang"
                placeholderTextColor="lightgray"
                onChangeText={text => setLastName(text)}
              />
            </View>
            <TextInput
              style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
              placeholder="Nama pengguna"
              placeholderTextColor="lightgray"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
              placeholder="Email"
              placeholderTextColor="lightgray"
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />
            <View style={tw`flex flex-row items-center`}>
              <TextInput
                style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
                placeholder="Kata sandi"
                onChangeText={text => setPassword(text)}
                placeholderTextColor="lightgray"
                secureTextEntry={!toggleCheckBox}
              />
              <TextInput
                style={tw`flex-1 border-2 border-purple-100 text-white py-1 rounded-xl px-2 mt-2 text-xs`}
                placeholder="Konfirmasi sandi"
                onChangeText={text => setPasswordConfirmation(text)}
                placeholderTextColor="lightgray"
                secureTextEntry={!toggleCheckBox}
              />
            </View>
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
            <View style={tw`w-full px-4 mt-8`}>
              <TouchableOpacity
                disabled={isLoading}
                onPress={handleRegister}
                style={tw`w-full bg-white items-center py-2 rounded-xl`}>
                {!isLoading ? (
                  <Text style={tw`text-2xl font-bold text-blue-600`}>Daftar</Text>
                ) : (
                  <ActivityIndicator size="small" style={tw`py-1`} />
                )}
              </TouchableOpacity>
            </View>
            <View style={tw`w-full px-4 mt-8 flex-row justify-center`}>
              <Text style={tw`text-lg font-bold text-white mr-2`}>
                Sudah punya akun?
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={tw`text-lg font-bold text-black`}>Masuk</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

export default Register;

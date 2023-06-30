import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DAILYCOUNTING from './static/daily-couting.json';

function History() {
  const [isDatePickerShow, setDatePickerShow] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isUsingTime, setUsingTime] = useState(true);
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <StatusBar backgroundColor="#7303fc" />
        <LinearGradient
          colors={['#7e03fc', '#bbebff', '#ffffff']}
          style={tw`h-72`}>
          <View style={tw`mt-4 mx-2`}>
            <Text style={tw`text-2xl font-semibold text-purple-100`}>
              Riwayat perhitungan
            </Text>
          </View>
          <View style={tw`mt-4 mx-2 justify-end flex-row`}>
            <TouchableOpacity
              style={tw`px-4 py-2 rounded-xl items-center bg-purple-700 flex-row`}
              onPress={() => setDatePickerShow(true)}>
              <Text style={tw`text-white`}>
                {!isUsingTime ? '-' : new Date(time).toLocaleDateString()}
              </Text>
              <AntDesign name="calendar" style={tw`text-white pl-4`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`px-4 py-2 rounded-xl items-center bg-red-700 flex-row`}
              onPress={() => setUsingTime(false)}>
              <Text style={tw`text-white`}>Reset Waktu</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      {!isDatePickerShow ? null : (
        <RNDateTimePicker
          value={new Date(time)}
          onChange={time => {
            setTime(time?.nativeEvent?.timestamp);
            setDatePickerShow(false);
            setUsingTime(true);
          }}
        />
      )}

      <ScrollView
        style={tw.style(`flex-6`)}>
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
                    <Text style={tw`text-white text-xs`}>
                      Banyak nya perhitungan
                    </Text>
                    <Text style={tw`text-white text-xl font-bold`}>
                      {e.counter} kalkulasi
                    </Text>
                  </View>
                  <View style={tw`flex-col my-2`}>
                    <Text style={tw`text-white text-xs`}>
                      Total benih yang terhitung
                    </Text>
                    <Text style={tw`text-white text-xl font-bold`}>
                      {e.calculatedShrimpTotal} benih
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default History;

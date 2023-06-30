import React, {useEffect, useRef, useState} from 'react';
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
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import tw from 'twrnc';
import {UploadService} from '../../../services/Upload';
import ControllerCamera from './partials/ControllerCamera';
import OnNotGranted from './partials/OnNotGranted';

function CameraView({navigation}) {
  const [loading, setLoading] = useState(true);
  const [isDenied, setDenied] = useState(true);
  const [isCounting, setCounting] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [lastCount, setLastCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [controller, setController] = useState({
    torch: false,
    flash: false,
  });
  const camera = useRef(Camera);
  const devices = useCameraDevices();
  const device = devices.back;

  const takePhoto = async () => {
    setCounting(true);
    const photo = await camera.current.takePhoto({
      flash: controller.flash ? 'on' : 'off',
    });

    const data = new FormData();
    data.append('file', {
      uri: `file:///${photo.path}`,
      type: 'image/jpg',
      name: photo.path.split('/')[photo.path.split('/').length - 1],
    });

    console.log({
      uri: `file:///${photo.path}`,
      type: 'image/jpg',
      name: photo.path.split('/')[photo.path.split('/').length - 1],
    })

    await UploadService.onlyNumber(data).then(e => {
      setLastCount(e?.data?.count);
      setTotalCount(totalCount + e?.data?.count);
      setCounting(false);
    }).catch(res => {
      console.log(res)
    })
  };

  const getPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    if (newCameraPermission === 'denied') {
      setDenied(true);
      return setLoading(false);
    }
    setDenied(false);
    return setLoading(false);
  };

  useEffect(() => {
    getPermission();
  }, []);

  if (loading)
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size={40} color="skyblue" />
      </View>
    );
  if (isDenied) return <OnNotGranted getPermission={getPermission} />;
  if (device == null) return <ActivityIndicator />;

  return (
    <View style={tw.style(`flex-1 flex-col`)}>
      <StatusBar backgroundColor="black" />
      <Camera
        ref={camera}
        style={tw`flex-1`}
        device={device}
        photo={true}
        isActive={true}
        photoHeight={412}
        photoWidth={412}
        torch={controller.torch ? 'on' : 'off'}
        orientation="portrait"
        focusable={true}
      />
      {!isCounting ? null : (
        <View
          style={tw`absolute bottom-0 top-0 rounded-top bg-black bg-opacity-60 h-full w-full justify-center items-center`}>
          <ActivityIndicator size={40} />
          <Text style={tw`text-gray-100 text-2xl`}>Menghitung</Text>
        </View>
      )}

      {!isSaving ? null : (
        <View
          style={tw`absolute bottom-0 top-0 rounded-top bg-black bg-opacity-60 h-full w-full justify-center items-center`}>
          <ActivityIndicator size={40} />
          <Text style={tw`text-gray-100 text-2xl`}>Menyimpan</Text>
        </View>
      )}

      <ControllerCamera
        takePhoto={takePhoto}
        controller={controller}
        setController={setController}
        lastCount={lastCount}
        totalCount={totalCount}
        setTotalCount={setTotalCount}
        setLastCount={setLastCount}
        isCounting={isCounting}
        setSaving={setSaving}
        navigation={navigation}
      />
    </View>
  );
}

export default CameraView;

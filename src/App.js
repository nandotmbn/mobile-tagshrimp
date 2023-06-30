/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './state/store';
import Auth from './router/Auth';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAccessToken} from './state/slices/auth';
import Active from './router/Active';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const accessToken = useSelector(state => state.auth.accessToken);
  const dispatch = useDispatch();

  const asyncStorageTokenChecker = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoading(false);
      return dispatch(updateAccessToken(token));
    }
    dispatch(updateAccessToken(''));
    setLoading(false);
  };

  useEffect(() => {
    asyncStorageTokenChecker();
  }, [accessToken]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {!accessToken ? <Auth /> : <Active />}
    </NavigationContainer>
  );
};

const RootContextApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootContextApp;

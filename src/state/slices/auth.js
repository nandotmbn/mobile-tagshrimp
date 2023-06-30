/* eslint-disable no-unused-vars */
import {createSlice} from '@reduxjs/toolkit';
export const accessToken = createSlice({
  name: 'auth',
  initialState: {
    accessToken: ""
  },
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const {updateAccessToken} = accessToken.actions;
export const getToken = state => state.accessToken;
export default accessToken.reducer;

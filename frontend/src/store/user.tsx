import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = Cookies.get('user')
  ? JSON.parse(Cookies.get('user') || '')
  : null;
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    Showloading: (state, action) => {
      state.loading = true;
    },
    Hideloading: (state, action) => {
      state.loading = false;
    },
  },
});
export const { Showloading, Hideloading } = alertSlice.actions;
export default alertSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const usersslice = createSlice({
  name: 'users',
  initialState: {
    user: null,
  },
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { SetUser } = usersslice.actions;
export default usersslice.reducer;

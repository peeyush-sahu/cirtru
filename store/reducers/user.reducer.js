import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		}
	}
});

export default userSlice.reducer;

export const {} = userSlice.actions;

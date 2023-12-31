import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoggedIn: false,
	settings: {
		isDark: false
	}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},

		setSettings: (state, action) => {
			state.settings = action.payload;
		}
	}
});

export default userSlice.reducer;

export const { setIsLoggedIn, setSettings } = userSlice.actions;

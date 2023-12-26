import { api } from './services';
import { miscApi } from './services/misc';
import userReducer from './reducers/user.reducer';
import { configureStore } from '@reduxjs/toolkit';
import commonReducer from './reducers/common.reducer';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		user: userReducer,
		common: commonReducer,

		[api.reducerPath]: api.reducer,
		[miscApi.reducerPath]: miscApi.reducer
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware).concat(miscApi.middleware)
});

setupListeners(store.dispatch);

import { configureStore } from '@reduxjs/toolkit';

import modalReducer from '../slices/singInSingUpSlice';
import appReducer from '../slices/appSlice';
import singleFormReducer from '../slices/singleFormSlice';
import newsReducer from '../slices/newsSlice';
import userReducer from '../slices/userSlice';
import manipulationNewsReducer from '../slices/manipulationNewsSlice';

const store = configureStore({
	devTools: process.env.NODE_ENV !== 'production',
	reducer: {
		device: appReducer,
		modal: modalReducer,
		user: userReducer,
		singleForm: singleFormReducer,
		news: newsReducer,
		manipulationNews: manipulationNewsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

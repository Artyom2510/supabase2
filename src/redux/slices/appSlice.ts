import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './../reducers/index';

type initialStateDevice = {
	width: number;
};

const initialState: initialStateDevice = {
	width: 0
};

export const slice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDeviceWindowProps: (state, { payload }: PayloadAction<number>) => {
			state.width = payload;
		}
	}
});

export const { setDeviceWindowProps } = slice.actions;
export const selectIsMobile = (state: RootState) => state.device.width < 768;
export default slice.reducer;

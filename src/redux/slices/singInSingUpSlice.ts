import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../reducers/index';

type ModalState = {
	isOpen: boolean;
};

const initialState: ModalState = {
	isOpen: false
};

export const slice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		tglModal: state => {
			state.isOpen = !state.isOpen;
		}
	}
});

export const { tglModal } = slice.actions;
export const selectModal = (state: RootState) => state.modal.isOpen;

export default slice.reducer;

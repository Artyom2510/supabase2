import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import type { RootState } from '../reducers/index';
import { supaBaseClient } from '../../clients';
import { handleHttpError } from '../../helpers/handleHttpError';
import { NewsDTO } from '../../models/NewsDto.dto';
import { SingleFormState } from '../../models/SingleFormState';

interface InitialState extends SingleFormState {
	newNews: NewsDTO;
}

const newNews = {
	title: '',
	desc: ''
};

const initialState: InitialState = {
	isSending: false,
	isSended: false,
	error: null,
	newNews
};

export const slice = createSlice({
	name: 'manipulationNews',
	initialState,
	reducers: {
		sendDataStart: state => {
			state.isSending = true;
			state.isSended = false;
		},
		sendDataSuccess: state => {
			state.isSending = false;
			state.isSended = true;
		},
		sendDataFailure: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isSending = false;
			state.isSended = true;
		}
	}
});
const { sendDataStart, sendDataSuccess, sendDataFailure } = slice.actions;

export const createNews =
	(data: NewsDTO, cb: () => void) => async (dispatch: Dispatch) => {
		dispatch(sendDataStart());
		try {
			const dataObj = await supaBaseClient.createNews(data);
			if (dataObj) {
				dispatch(sendDataSuccess());
				cb && cb();
			} else {
				dispatch(sendDataFailure('ошибка сервера'));
			}
		} catch (err) {
			dispatch(sendDataFailure(handleHttpError(err)));
		}
	};

export const updateNews =
	(id: number, status: boolean, cb: () => void) =>
	async (dispatch: Dispatch) => {
		dispatch(sendDataStart());
		try {
			const dataObj = await supaBaseClient.updateNews({ id, status });
			if (dataObj) {
				dispatch(sendDataSuccess());
				cb && cb();
			} else {
				dispatch(sendDataFailure('ошибка сервера'));
			}
		} catch (err) {
			dispatch(sendDataFailure(handleHttpError(err)));
		}
	};

export const deleteNews =
	(id: number, cb: () => void) =>
	async (dispatch: Dispatch, getState: () => RootState) => {
		dispatch(sendDataStart());
		try {
			const dataObj = await supaBaseClient.deleteNews(id);
			if (dataObj) {
				dispatch(sendDataSuccess());
				cb && cb();
			} else {
				dispatch(sendDataFailure('ошибка сервера'));
			}
		} catch (err) {
			dispatch(sendDataFailure(handleHttpError(err)));
		}
	};

export const selectManipulationNews = (state: RootState) =>
	state.manipulationNews;

export default slice.reducer;

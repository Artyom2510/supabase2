import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

import type { RootState } from '../reducers/index';
import { supaBaseClient } from '../../clients';
import { handleHttpError } from '../../helpers/handleHttpError';
import { GeneralInputs, SingleFormState } from '../../models/SingleFormState';

const initialState: SingleFormState = {
	isSending: false,
	isSended: false,
	error: null
};

export const slice = createSlice({
	name: 'singleForm',
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
		},
		setDefault: () => {
			return {
				...initialState
			};
		}
	}
});
const { sendDataStart, sendDataSuccess, sendDataFailure } = slice.actions;
export const { setDefault } = slice.actions;

export const sendFormSignUp =
	({ login, password }: GeneralInputs, cb: () => void) =>
	async (dispatch: Dispatch) => {
		dispatch(sendDataStart());
		try {
			const data = await supaBaseClient.signUp({
				login,
				password
			});
			if (data) {
				dispatch(sendDataSuccess());
				cb && cb();
			} else {
				dispatch(sendDataFailure('ошибка сервера'));
			}
		} catch (err) {
			dispatch(sendDataFailure(handleHttpError(err)));
		}
	};

export const sendFormSignIn =
	({ login, password }: GeneralInputs, cb: () => void) =>
	async (dispatch: Dispatch) => {
		dispatch(sendDataStart());
		try {
			const data = await supaBaseClient.signIn({
				login,
				password
			});
			if (data) {
				dispatch(sendDataSuccess());
				cb && cb();
			} else {
				dispatch(sendDataFailure('ошибка сервера'));
			}
		} catch (err) {
			dispatch(sendDataFailure(handleHttpError(err)));
		}
	};

export const selectSingleForm = (state: RootState) => state.singleForm;

export default slice.reducer;

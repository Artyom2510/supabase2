import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { supaBaseClient } from '../../clients';
import { handleHttpError } from '../../helpers/handleHttpError';
import { NewsDTO } from '../../models/NewsDto.dto';
import type { RootState } from '../reducers/index';

type NewsState = {
	news: NewsDTO[];
	isLoading: boolean;
	isLoaded: boolean;
	error: string;
};

const initialState: NewsState = {
	news: [],
	isLoading: false,
	isLoaded: false,
	error: ''
};

export const slice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		getDataStart: state => {
			state.isLoading = true;
		},
		getDataSuccess: (state, { payload }: PayloadAction<NewsDTO[]>) => {
			state.news = payload;
			state.isLoading = false;
			state.isLoaded = true;
		},
		getDataFailure: (state, { payload }: PayloadAction<string>) => {
			state.error = payload;
			state.isLoading = false;
		}
	}
});

const { getDataStart, getDataSuccess, getDataFailure } = slice.actions;

export const loadNews = (admin?: boolean) => async (dispatch: Dispatch) => {
	dispatch(getDataStart());
	try {
		const data = admin
			? await supaBaseClient.getNewsList()
			: await supaBaseClient.getApprovedNewsList();
		if (data) {
			dispatch(getDataSuccess(data));
		} else {
			dispatch(getDataFailure('ошибка сервера'));
		}
	} catch (err) {
		dispatch(getDataFailure(handleHttpError(err)));
	}
};

export const selectNews = (state: RootState) => state.news;

export default slice.reducer;

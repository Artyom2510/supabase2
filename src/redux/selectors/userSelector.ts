import { createSelector } from 'reselect';
import type { RootState } from '../reducers/index';

export const selectUserState = (state: RootState) => state.user;
export const userSelector = createSelector(
	[selectUserState],
	state => state.user
);

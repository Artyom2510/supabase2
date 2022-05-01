import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

export type UserState = {
	user: User | null;
};

const initialState: UserState = {
	user: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<User | null>) => {
			state.user = payload;
		},
		removeUser: state => {
			state.user = null;
		}
	}
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

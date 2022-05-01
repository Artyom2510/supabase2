import React, { useEffect, FC, ReactNode } from 'react';
import { supaBaseClient } from '../clients';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/slices/userSlice';

type AuthProps = {
	children?: ReactNode;
};

export const Auth: FC<AuthProps> = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const { data } = supaBaseClient.supabase.auth.onAuthStateChange(
			(_, session) => {
				if (session) {
					const { user } = session;
					dispatch(setUser(user));
				}
			}
		);

		return () => {
			data && data.unsubscribe();
		};
	}, []);

	return <>{children}</>;
};

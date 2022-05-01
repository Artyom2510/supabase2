import { removeUser } from '../redux/slices/userSlice';
import { supaBaseClient } from '../clients';
import { useAppDispatch } from '../redux/hooks';

export const useLogOut = () => {
	const dispatch = useAppDispatch();

	return async () => {
		await supaBaseClient.logOut();
		dispatch(removeUser());
	};
};

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useLogOut } from '../hooks/useLogOut';
import { useAppDispatch } from '../redux/hooks';
import { userSelector } from '../redux/selectors/userSelector';
import { tglModal } from '../redux/slices/singInSingUpSlice';
import Button from './ui/Button';

type LoginButtonsProps = {
	className?: string;
	handleTglMenu?: () => void;
};

const LoginButtons: FC<LoginButtonsProps> = ({ className, handleTglMenu }) => {
	const user = useSelector(userSelector);
	const dispatch = useAppDispatch();
	const logOut = useLogOut();

	const handleTglModal = () => {
		handleTglMenu && handleTglMenu();
		dispatch(tglModal());
	};

	const handleLogOut = () => {
		handleTglMenu && handleTglMenu();
		logOut();
	};

	return (
		<>
			{!user ? (
				<Button handleClick={handleTglModal}>Sign In</Button>
			) : (
				<Button handleClick={handleLogOut} className={className}>
					Log out
				</Button>
			)}
		</>
	);
};

export default LoginButtons;

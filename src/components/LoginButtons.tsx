import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLogOut } from '../hooks/useLogOut';
import { useAppDispatch } from '../redux/hooks';
import { userSelector } from '../redux/selectors/userSelector';
import { setDefault } from '../redux/slices/singleFormSlice';
import FormController from './FormController';
import SingleFormRegistration from './Forms/SingleFormRegistration';
import Button from './ui/Button';
import Modal from './ui/Modal';
import ModalThx from './ui/ModalThx';

type LoginButtonsProps = {
	className?: string;
	handleTglMenu?: () => void;
};

const LoginButtons: FC<LoginButtonsProps> = ({ className, handleTglMenu }) => {
	const user = useSelector(userSelector);
	const logOut = useLogOut();
	const dispatch = useAppDispatch();
	const [isShowingSingleForm, setIsShowingSingleForm] = useState(false);

	const handleLogOut = () => {
		handleTglMenu && handleTglMenu();
		logOut();
	};

	const tglPopupSingInSingUp = () => {
		isShowingSingleForm && dispatch(setDefault());
		setIsShowingSingleForm(isShowingSingleForm => !isShowingSingleForm);
	};

	return (
		<>
			{!user ? (
				<Button handleClick={tglPopupSingInSingUp}>Sign In</Button>
			) : (
				<Button handleClick={handleLogOut} className={className}>
					Log out
				</Button>
			)}

			{isShowingSingleForm && (
				<Modal hide={tglPopupSingInSingUp}>
					<FormController>
						{(isShowForm, setShowThx) =>
							isShowForm ? (
								<SingleFormRegistration onSuccess={setShowThx} />
							) : (
								<ModalThx hide={tglPopupSingInSingUp} desc='Successful login' />
							)
						}
					</FormController>
				</Modal>
			)}
		</>
	);
};

export default LoginButtons;

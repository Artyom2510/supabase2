import React, { useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setDefault } from '../redux/slices/singleFormSlice';
import FormController from './FormController';
import SingleFormRegistration from './Forms/SingleFormRegistration';

import Header from './Header';
import Modal from './ui/Modal';
import ModalThx from './ui/ModalThx';

const Layout = () => {
	const root = document.querySelector('.root');
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [isShowingSingleForm, setIsShowingSingleForm] = useState(false);

	const tglPopupSingInSingUp = () => {
		isShowingSingleForm && dispatch(setDefault());
		setIsShowingSingleForm(isShowingSingleForm => !isShowingSingleForm);
	};

	useEffect(() => {
		!!root && root.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Header tglPopupSingInSingUp={tglPopupSingInSingUp} />
			<main>
				<Outlet />
			</main>

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

export default Layout;

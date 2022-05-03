import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { selectModal, tglModal } from '../redux/slices/singInSingUpSlice';
import { setDefault } from '../redux/slices/singleFormSlice';
import FormController from './FormController';
import SingleFormRegistration from './Forms/SingleFormRegistration';

import Header from './Header';
import Modal from './ui/Modal';
import ModalThx from './ui/ModalThx';

const Layout = () => {
	const root = document.querySelector('.root') as HTMLDivElement;
	const location = useLocation();
	const isOpen = useSelector(selectModal);
	const dispatch = useAppDispatch();

	const tglPopupSingInSingUp = () => {
		isOpen && dispatch(setDefault());
		dispatch(tglModal());
	};

	useEffect(() => {
		root && root.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>

			{isOpen && (
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

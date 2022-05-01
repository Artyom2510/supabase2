import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from './components/Auth';
import Routing from './Routes';
import { useAppDispatch } from './redux/hooks';
import { userSelector } from './redux/selectors/userSelector';
import { loadNews } from './redux/slices/newsSlice';

const App = () => {
	useEffect(() => {
		const updateDeviceProps = () => {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		};

		updateDeviceProps();
		window.addEventListener('resize', updateDeviceProps);

		return () => {
			window.removeEventListener('resize', updateDeviceProps);
		};
	}, []);
	const user = useSelector(userSelector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const isAdmin = user?.user_metadata.admin === 'Profilance Group';
		dispatch(loadNews(isAdmin));
	}, [user]);

	return (
		<Auth>
			<Routing />
		</Auth>
	);
};

export default App;

import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Auth } from './components/Auth';
import Routing from './Routes';
import { useAppDispatch } from './redux/hooks';
import { userSelector } from './redux/selectors/userSelector';
import { loadNews } from './redux/slices/newsSlice';
import { setDeviceWindowProps } from './redux/slices/appSlice';

const App = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const updateDeviceProps = () => {
			const windowW = window.innerWidth;
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
			dispatch(setDeviceWindowProps(windowW));
		};

		updateDeviceProps();
		window.addEventListener('resize', updateDeviceProps);

		return () => {
			window.removeEventListener('resize', updateDeviceProps);
		};
	}, []);
	const user = useSelector(userSelector);

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

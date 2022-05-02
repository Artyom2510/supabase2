import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = () => {
	const root = document.querySelector('.root');
	const location = useLocation();

	useEffect(() => {
		!!root && root.scrollTo(0, 0);
	}, [location]);

	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;

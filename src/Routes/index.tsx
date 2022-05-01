import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminPanel from '../pages/AdminPanel';
import Home from '../pages/Home';
import News from '../pages/News';
import NotFound from '../pages/NotFound';
import { GuardedRoute } from '../components/GuardedRoute';

const Routes = () => {
	const routes = useRoutes([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '',
					element: <Home />,
					index: true
				},
				{ path: 'news', element: <News /> },
				{
					path: 'admin-panel',
					element: (
						<GuardedRoute>
							<AdminPanel />
						</GuardedRoute>
					)
				},
				{ path: '*', element: <NotFound /> }
			]
		}
	]);
	return routes;
};

export default Routes;

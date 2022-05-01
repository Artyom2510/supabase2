import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelector } from '../redux/selectors/userSelector';

type GuardedRouteProps = {
	children: ReactNode;
};

export const GuardedRoute: FC<GuardedRouteProps> = ({ children }) => {
	const user = useSelector(userSelector);
	const location = useLocation();

	if (user?.user_metadata.admin !== 'Profilance Group') {
		return <Navigate to='/' state={{ from: location }} />;
	}
	return <>{children}</>;
};

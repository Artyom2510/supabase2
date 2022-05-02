import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';

import styles from './NavLinks.module.scss';

type NavLinksProps = {
	className: string;
};

const NavLinks: FC<NavLinksProps> = ({ className }) => {
	const user = useSelector(userSelector);

	return (
		<>
			<li className={className}>
				<NavLink
					to='news'
					className={({ isActive }) =>
						isActive
							? `${styles.headerLink} ${styles.headerLink_active}`
							: styles.headerLink
					}
				>
					<span className={cn(styles.headerLink__name, 'h4')}>News</span>
				</NavLink>
			</li>
			{user?.user_metadata.admin === 'Profilance Group' && (
				<li className={className}>
					<NavLink
						to='admin-panel'
						className={({ isActive }) =>
							isActive
								? `${styles.headerLink} ${styles.headerLink_active}`
								: styles.headerLink
						}
					>
						<span className={cn(styles.headerLink__name, 'h4')}>
							Admin Panel
						</span>
					</NavLink>
				</li>
			)}
		</>
	);
};

export default NavLinks;

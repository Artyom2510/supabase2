import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Button from '../ui/Button';
import styles from './Header.module.scss';
import { ReactComponent as LogoImg } from '../../assets/img/icons/logo.svg';
import { userSelector } from '../../redux/selectors/userSelector';
import { useLogOut } from '../../hooks/useLogOut';

type HeaderProps = {
	tglPopupSingInSingUp: () => void;
};

const Header: FC<HeaderProps> = ({ tglPopupSingInSingUp }) => {
	const user = useSelector(userSelector);
	const logOut = useLogOut();

	return (
		<header className={styles.header}>
			<nav className={cn(styles.header__nav, styles.headerNav)}>
				<ul className={cn(styles.headerNav__list, styles.navList)}>
					<li className={styles.navList__item}>
						<NavLink to='/' className={styles.headerLink}>
							<LogoImg className={styles.headerLink__img} />
						</NavLink>
					</li>
					<li className={styles.navList__item}>
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
						<li className={styles.navList__item}>
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
				</ul>
			</nav>
			{!user ? (
				<Button handleClick={tglPopupSingInSingUp}>Sign In</Button>
			) : (
				<Button handleClick={logOut} className={styles.headerBtns__btn}>
					Log out
				</Button>
			)}
		</header>
	);
};

export default Header;

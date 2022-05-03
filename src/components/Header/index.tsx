import React, { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './Header.module.scss';
import { ReactComponent as LogoImg } from '../../assets/img/icons/logo.svg';
import { selectIsMobile } from '../../redux/slices/appSlice';
import Burger from '../ui/Burger';
import BurgerMenu from '../BurgerMenu';
import LoginButtons from '../LoginButtons';
import NavLinks from '../NavLinks';

const Header: FC = () => {
	const isMobile = useSelector(selectIsMobile);
	const [menuDisplay, setMenuDisplay] = useState(false);
	const [menuVisible, setMenuVisible] = useState(false);
	const { pathname } = useLocation();

	const handleTglMenu = () => {
		if (isMobile) {
			if (menuDisplay) {
				setMenuVisible(false);
				setTimeout(() => {
					setMenuDisplay(false);
				}, 300);
			} else {
				setMenuDisplay(true);
				setTimeout(() => {
					setMenuVisible(true);
				}, 0);
			}
		}
	};

	useEffect(() => {
		menuDisplay && handleTglMenu();
	}, [pathname]);

	return (
		<header className={styles.header}>
			<nav className={cn(styles.header__nav, styles.headerNav)}>
				<ul className={cn(styles.headerNav__list, styles.navList)}>
					<li className={styles.navList__item}>
						<NavLink to='/' className={styles.headerLink}>
							<LogoImg className={styles.headerLink__img} />
						</NavLink>
					</li>
					{!isMobile && <NavLinks className={styles.navList__item} />}
				</ul>
			</nav>
			{isMobile ? (
				<>
					<Burger
						className={styles.header__burger}
						handleTglMenu={handleTglMenu}
						menuVisible={menuVisible}
					/>
					<BurgerMenu
						handleTglMenu={handleTglMenu}
						menuDisplay={menuDisplay}
						menuVisible={menuVisible}
					/>
				</>
			) : (
				<LoginButtons
					className={styles.headerBtns__btn}
					handleTglMenu={handleTglMenu}
				/>
			)}
		</header>
	);
};

export default Header;

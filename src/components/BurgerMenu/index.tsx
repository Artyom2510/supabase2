import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import LoginButtons from '../LoginButtons';

type BurgerMenuProps = {
	menuDisplay: boolean;
	menuVisible: boolean;
	handleTglMenu: () => void;
};

import styles from './BurgerMenu.module.scss';
import NavLinks from '../NavLinks';
import Burger from '../ui/Burger';

const BurgerMenu: FC<BurgerMenuProps> = ({
	menuDisplay,
	handleTglMenu,
	menuVisible
}) => {
	return (
		<>
			{menuDisplay
				? createPortal(
						<div
							className={cn(styles.menu, {
								[styles.menu_visible]: menuVisible
							})}
						>
							<Burger
								className={styles.menu__burger}
								handleTglMenu={handleTglMenu}
								menuVisible={menuVisible}
							/>
							<ul className={cn(styles.menu__list, styles.menuList)}>
								<NavLinks className={styles.menuList__item} />
							</ul>
							<LoginButtons
								className={styles.menu__btns}
								handleTglMenu={handleTglMenu}
							/>
						</div>,
						document.body
				  )
				: null}
		</>
	);
};

export default BurgerMenu;

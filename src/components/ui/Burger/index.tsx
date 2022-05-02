import React, { FC, useState } from 'react';
import cn from 'classnames';

import styles from './Burger.module.scss';

type BurgerProps = {
	handleTglMenu: () => void;
	menuVisible: boolean;
	className?: string;
};

const Burger: FC<BurgerProps> = ({ handleTglMenu, menuVisible, className }) => {
	return (
		<button
			className={cn(
				className,
				styles.btnBurger,
				menuVisible ? styles.btnBurger_open : styles.btnBurger_close
			)}
			onClick={handleTglMenu}
		>
			<div className={styles.btnBurger__icon}>
				<span></span>
			</div>
		</button>
	);
};

export default Burger;

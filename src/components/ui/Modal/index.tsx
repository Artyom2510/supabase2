import React, { useState, useEffect, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import styles from './Modal.module.scss';

type ModalProps = {
	hide: () => void;
	modifierPopupClass?: string;
	children?: ReactNode;
	container?: Element;
};

const Modal: FC<ModalProps> = ({
	hide = () => {},
	modifierPopupClass = '',
	children = null,
	container = document.body
}) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<>
			{createPortal(
				<div
					className={cn(styles.popup, styles[modifierPopupClass], {
						[styles.popup_visible]: visible
					})}
				>
					<div className={styles.popup__bg} onClick={hide}></div>
					<div className={styles.popup__wrap}>
						<button className={styles.popup__close} onClick={hide}></button>
						{children}
					</div>
				</div>,
				container
			)}
		</>
	);
};

export default Modal;

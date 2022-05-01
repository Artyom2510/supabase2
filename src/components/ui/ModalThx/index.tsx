import React, { FC, useEffect, useRef } from 'react';

import checkImg from '../../../assets/img/icons/check.svg';

import styles from './ModalThx.module.scss';

type ThxProps = {
	hide: () => void;
	time?: number;
	desc?: string;
};

const ModalThx: FC<ThxProps> = ({
	hide = () => null,
	time = 2500,
	desc = ''
}) => {
	const timer = useRef<NodeJS.Timeout>();

	useEffect(() => {
		timer.current = setTimeout(() => {
			hide();
		}, time);

		return () => {
			timer.current && clearTimeout(timer.current);
		};
	}, []);

	return (
		<div className={styles.popupThx}>
			<p className={styles.popupThx__desc}>{desc}</p>
			<img src={checkImg} alt='&#10003;' className={styles.popupThx__icon} />
		</div>
	);
};

export default ModalThx;

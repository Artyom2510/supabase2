import React, { FC } from 'react';
import cn from 'classnames';

import styles from './Spinner.module.scss';

type SpinnerProps = {
	size?: 'small' | 'default';
};

const Spinner: FC<SpinnerProps> = ({ size = 'default' }) => {
	return (
		<div
			className={cn(styles.spinner, {
				[styles.spinner_sm]: size === 'small'
			})}
		/>
	);
};

export default Spinner;

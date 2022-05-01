import React, { FC } from 'react';

type CheckboxProps = {
	id: string;
	name: string;
	defaultChecked: boolean;
	disabled: boolean;
	handleChange: () => void;
};

import styles from './Checkbox.module.scss';

const Checkbox: FC<CheckboxProps> = ({
	id,
	name,
	defaultChecked = false,
	disabled = false,
	handleChange
}) => {
	return (
		<div className={styles.checkbox}>
			<input
				type='checkbox'
				className={styles.checkbox__input}
				name={name}
				id={id}
				onChange={handleChange}
				defaultChecked={defaultChecked}
				disabled={disabled}
			/>
			<label htmlFor={id} className={styles.checkbox__label} />
		</div>
	);
};

export default Checkbox;

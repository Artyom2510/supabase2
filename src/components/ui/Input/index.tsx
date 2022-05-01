import React, { forwardRef, useRef, useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames';

import styles from './Input.module.scss';

type InputProps = {
	fieldType?: 'input' | 'textarea';
	type?: 'text' | 'password';
	autoFocus?: boolean;
	placeholder?: string;
	className?: string;
	label?: string;
	error?: string;
	readOnly?: boolean;
	defaultValue?: string;
} & Omit<UseFormRegisterReturn, 'ref'>;

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
	(
		{
			fieldType = 'input',
			type = 'text',
			autoFocus = false,
			className = '',
			label = '',
			error = '',
			...props
		},
		ref
	) => {
		const id = useRef(useId()).current;

		return (
			<div
				className={cn(styles.formfield, className, {
					[styles.formfield_error]: !!error
				})}
			>
				{label && (
					<label htmlFor={id} className={styles.formfield__label}>
						{label}
					</label>
				)}
				{fieldType !== 'textarea' ? (
					<input
						ref={ref}
						type={type}
						autoFocus={autoFocus}
						autoComplete='off'
						className={styles.formfield__input}
						{...props}
					/>
				) : (
					<textarea
						ref={ref}
						autoComplete='off'
						{...props}
						className={styles.formfield__textarea}
					/>
				)}
				<small className={styles.formfield__error}>{error}</small>
			</div>
		);
	}
);

Input.displayName = 'Input';
export default Input;

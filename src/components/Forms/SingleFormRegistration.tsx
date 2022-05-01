import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import cn from 'classnames';

import Input from '../ui/Input';
import Button from '../ui/Button';
import {
	selectSingleForm,
	sendFormSignUp,
	sendFormSignIn
} from '../../redux/slices/singleFormSlice';
import Spinner from '../ui/Spinner';

import styles from './Form.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { GeneralInputs } from '../../models/SingleFormState';

type SingleFormRegistrationProps = {
	onSuccess: () => void;
};

const schema = yup.object().shape({
	login: yup.string().required(),
	password: yup.string().min(6).required()
});

const SingleFormRegistration: FC<SingleFormRegistrationProps> = ({
	onSuccess
}) => {
	const dispatch = useAppDispatch();
	const { isSending, error } = useSelector(selectSingleForm);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<GeneralInputs>({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const onsubmit = handleSubmit(data => {
		dispatch(
			sendFormSignIn(data, () => {
				onSuccess();
			})
		);
	});

	const handleSubmitClick = handleSubmit(data => {
		dispatch(
			sendFormSignUp(data, () => {
				onSuccess();
			})
		);
	});

	return (
		<form className={styles.form} noValidate onSubmit={onsubmit}>
			<h3 className={styles.form__title}>Fill the form</h3>
			<div className={styles.form__fields}>
				<Input
					className={styles.form__field}
					error={errors.login?.message}
					{...register('login')}
					placeholder='login'
					label='Login'
				/>
				<Input
					className={styles.form__field}
					type='password'
					error={errors.password?.message}
					{...register('password')}
					placeholder='password'
					label='Password (min 6 characters)'
				/>
			</div>

			<div
				className={cn(
					styles.form__footer,
					styles.formFooter,
					isSending && styles.formFooter_sending
				)}
			>
				{isSending ? (
					<Spinner />
				) : (
					<>
						{error && <p className={styles.formFooter__error}>{error}</p>}
						<Button type='submit' className={styles.formFooter__submit}>
							Sing In
						</Button>
						<Button
							type='button'
							className={styles.formFooter__submit}
							handleClick={handleSubmitClick}
						>
							Sing Up
						</Button>
					</>
				)}
			</div>
		</form>
	);
};

export default SingleFormRegistration;

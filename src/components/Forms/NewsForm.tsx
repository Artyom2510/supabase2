import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import cn from 'classnames';

import Input from '../ui/Input';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

import styles from './Form.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import {
	createNews,
	selectManipulationNews
} from '../../redux/slices/manipulationNewsSlice';

type NewsInput = {
	title: string;
	desc: string;
};

type NewsFormProps = {
	onSuccess: () => void;
};

const schema = yup.object().shape({
	title: yup.string().required(),
	desc: yup.string().required()
});

const NewsForm: FC<NewsFormProps> = ({ onSuccess }) => {
	const dispatch = useAppDispatch();
	const { isSending, error } = useSelector(selectManipulationNews);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<NewsInput>({
		mode: 'onBlur',
		resolver: yupResolver(schema)
	});

	const onsubmit = handleSubmit(data => {
		dispatch(
			createNews({ ...data, status: false }, () => {
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
					error={errors.title?.message}
					{...register('title')}
					placeholder='title'
					label='Title'
				/>
				<Input
					className={styles.form__field}
					error={errors.desc?.message}
					{...register('desc')}
					fieldType='textarea'
					placeholder='desc'
					label='Description'
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
							Offer news
						</Button>
					</>
				)}
			</div>
		</form>
	);
};

export default NewsForm;

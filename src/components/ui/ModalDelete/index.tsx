import React, { FC } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { deleteNews } from '../../../redux/slices/manipulationNewsSlice';
import Button from '../Button';
import Modal from '../Modal';

import styles from './ModalDelete.module.scss';

type ModalDeleteProps = {
	idRecord: number;
	handleTglDeleteModal: () => void;
	onSuccessDelete: () => void;
};

const ModalDelete: FC<ModalDeleteProps> = ({
	idRecord,
	handleTglDeleteModal,
	onSuccessDelete
}) => {
	const dispatch = useAppDispatch();

	const handleDeleteRecord = () => {
		dispatch(
			deleteNews(idRecord, () => {
				onSuccessDelete();
			})
		);
	};

	return (
		<Modal hide={handleTglDeleteModal}>
			<div className={styles.warning}>
				<p className={styles.warning__text}>
					Are you sure you want to delete this record - {idRecord}
				</p>
				<div className={styles.warning__btns}>
					<Button handleClick={handleDeleteRecord}>Yes</Button>
					<Button handleClick={handleTglDeleteModal}>No</Button>
				</div>
			</div>
		</Modal>
	);
};

export default ModalDelete;

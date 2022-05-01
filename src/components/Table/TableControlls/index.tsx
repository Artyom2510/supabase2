import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { updateNews } from '../../../redux/slices/manipulationNewsSlice';
import Checkbox from '../../ui/Checkbox';
import { ReactComponent as TrashIcon } from '../../../assets/img/icons/trash.svg';

type TableControllsProps = {
	id: number;
	cellId: string;
	status: boolean;
};

import styles from './TableControlls.module.scss';
import ModalDelete from '../../ui/ModalDelete';
import Spinner from '../../ui/Spinner';

const TableControlls: FC<TableControllsProps> = ({ id, cellId, status }) => {
	const dispatch = useAppDispatch();
	const [isDaleted, setIsDeleted] = useState(false);
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
	const [isUpdateLoading, setIsUpdateLoading] = useState(false);

	const handleApproveRecord = (idRecord: number, statusRecord: boolean) => {
		setIsUpdateLoading(true);
		dispatch(
			updateNews(idRecord, !statusRecord, () => {
				setIsUpdateLoading(false);
			})
		);
	};

	const handleTglDeleteModal = () => {
		setIsShowDeleteModal(!isShowDeleteModal);
	};

	const onSuccessDelete = () => {
		setIsDeleted(true);
		handleTglDeleteModal();
	};

	return (
		<>
			{!isDaleted ? (
				<div className={styles.controls}>
					{isUpdateLoading && (
						<div className={styles.controls__cover}>
							<Spinner size='small' />
						</div>
					)}
					<>
						<Checkbox
							defaultChecked={status}
							id={cellId}
							name={cellId}
							handleChange={() => handleApproveRecord(id, status)}
							disabled={isUpdateLoading}
						/>
						<button
							className={styles.deleteBtn}
							onClick={handleTglDeleteModal}
							disabled={isUpdateLoading}
						>
							<TrashIcon className={styles.deleteBtn__icon} />
						</button>
					</>
				</div>
			) : (
				<span className={styles.deleteDesc}>Deleted</span>
			)}

			{isShowDeleteModal && (
				<ModalDelete
					idRecord={id}
					handleTglDeleteModal={handleTglDeleteModal}
					onSuccessDelete={onSuccessDelete}
				/>
			)}
		</>
	);
};

export default TableControlls;

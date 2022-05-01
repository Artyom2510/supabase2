import React from 'react';
import Table from '../../components/Table';

import styles from './AdminPanel.module.scss';

const AdminPanel = () => {
	return (
		<section className={styles.setcTable}>
			<div className={styles.setcTable__wrap}>
				<Table className={styles.setcTable__table} />
			</div>
		</section>
	);
};

export default AdminPanel;

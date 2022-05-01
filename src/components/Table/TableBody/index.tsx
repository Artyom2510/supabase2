import React, { FC } from 'react';
import { TableInstanceProps } from '..';
import TableControlls from '../TableControlls';

import styles from './TableBody.module.scss';

const TableBody: FC<TableInstanceProps> = ({ instance }) => {
	return (
		<tbody {...instance.getTableBodyProps()}>
			{instance.getRowModel().rows.map(row => {
				return (
					<tr className={styles.tr} {...row.getRowProps()} key={row.id}>
						{row.getVisibleCells().map(cell => {
							return (
								<td
									className={styles.td}
									{...cell.getCellProps()}
									key={cell.columnId}
								>
									{typeof cell.value === 'boolean' ? (
										<TableControlls
											cellId={cell.id}
											status={row.values?.['status']}
											id={row.values?.['id']}
										/>
									) : (
										<>{cell.renderCell()}</>
									)}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;

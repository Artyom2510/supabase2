import React, { FC } from 'react';
import { TableInstanceProps } from '..';
import cn from 'classnames';
import TableSearch from '../TableSearch';

import styles from './TableHead.module.scss';
import styleBtn from '../../ui/Button/Btn.module.scss';
import styleInput from '../../ui/Input/Input.module.scss';

const TableHead: FC<TableInstanceProps> = ({ instance }) => {
	return (
		<thead>
			{instance.getHeaderGroups().map(headerGroup => (
				<tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
					{headerGroup.headers.map(header => {
						return (
							<th
								{...header.getHeaderProps()}
								key={header.id}
								className={styles.th}
							>
								<p className={styles.th__name}>{header.renderHeader()}</p>
								<button
									className={cn(styleBtn.btn, styles.th__sortBtn)}
									{...(header.column.getCanSort()
										? header.column.getToggleSortingProps()
										: {})}
								>
									{{
										asc: 'Asc',
										desc: 'Desc'
									}[header.column.getIsSorted() as string] ?? 'Default'}
								</button>
								{header.column.getCanColumnFilter() ? (
									<div className={cn(styles.th__search, styleInput.formfield)}>
										<TableSearch
											column={header.column}
											className={styleInput.formfield__input}
										/>
									</div>
								) : null}
							</th>
						);
					})}
				</tr>
			))}
		</thead>
	);
};

export default TableHead;

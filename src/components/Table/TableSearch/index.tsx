import React, { FC, ChangeEvent, useState } from 'react';
import { Column } from '@tanstack/react-table';

type TableSearchProps = {
	column: Column<any>;
	className?: string;
};

const TableSearch: FC<TableSearchProps> = ({ column, className = '' }) => {
	const [filterValue, setFilterValue] = useState('');
	const handleFilterTable = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		setFilterValue(e.target.value);
		column.setColumnFilterValue(e.target.value);
	};

	return (
		<input
			type='text'
			value={filterValue}
			onChange={handleFilterTable}
			placeholder='Search...'
			className={className}
		/>
	);
};

export default TableSearch;

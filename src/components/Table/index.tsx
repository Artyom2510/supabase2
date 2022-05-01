import React, { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNews } from '../../redux/slices/newsSlice';
import {
	ColumnFiltersState,
	createTable,
	getColumnFilteredRowModelSync,
	getCoreRowModelSync,
	getSortedRowModelSync,
	SortingState,
	TableInstance,
	useTableInstance
} from '@tanstack/react-table';
import { NewsDTO } from '../../models/NewsDto.dto';
import TableHead from './TableHead';
import TableBody from './TableBody';
import cn from 'classnames';

export type TableInstanceProps = {
	instance: TableInstance<any>;
};

import styles from './Table.module.scss';

type TableProps = {
	className: string;
};

const table = createTable().setRowType<NewsDTO>();
const Table: FC<TableProps> = ({ className }) => {
	const { news, isLoaded } = useSelector(selectNews);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const { createColumns, createDataColumn } = table;

	const columns = useMemo(
		() =>
			createColumns([
				createDataColumn('id', {
					id: 'id',
					cell: info => info.value,
					defaultCanFilter: false
				}),
				createDataColumn('title', {
					id: 'title'
				}),
				createDataColumn('desc', {
					id: 'desc'
				}),
				createDataColumn('created_at', {
					id: 'timestamp',
					defaultCanFilter: false,
					cell: info => new Date(info.value as Date).toLocaleString()
				}),
				createDataColumn('status', {
					id: 'status',
					defaultCanFilter: false
				})
			]),
		[]
	);

	const instance = useTableInstance(table, {
		data: news,
		columns,
		state: {
			columnFilters,
			sorting
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModelSync(),
		getColumnFilteredRowModel: getColumnFilteredRowModelSync(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModelSync()
	});

	return (
		<>
			{isLoaded && (
				<table
					className={cn(className, styles.table)}
					{...instance.getTableProps()}
				>
					<TableHead instance={instance} />
					<TableBody instance={instance} />
				</table>
			)}
		</>
	);
};

export default Table;

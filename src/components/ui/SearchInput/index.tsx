import React, { ChangeEvent, FC } from 'react';
import cn from 'classnames';

import styles from './SearchInput.module.scss';

type SearchInputProps = {
	className: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
};

const SearchInput: FC<SearchInputProps> = ({
	className,
	value,
	handleChange
}) => {
	return (
		<input
			type='search'
			name='search'
			placeholder='match-sorter search...'
			id='search'
			value={value}
			onChange={handleChange}
			className={cn(className, styles.search)}
		/>
	);
};

export default SearchInput;

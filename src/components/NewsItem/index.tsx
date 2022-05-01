import React, { FC } from 'react';
import { NewsDTO } from '../../models/NewsDto.dto';
import cn from 'classnames';
import styles from './NewsItem.module.scss';

interface CurrentNewsProps extends NewsDTO {
	className: string;
}

const NewsItem: FC<CurrentNewsProps> = ({
	className,
	title,
	desc,
	created_at
}) => {
	const date = created_at && new Date(created_at).toLocaleString();

	return (
		<li className={cn(className, styles.newsItem)}>
			<h4 className={styles.newsItem__title}>{title}</h4>
			<p className={styles.newsItem__desc}>{desc}</p>
			<p className={styles.newsItem__when}>{date}</p>
		</li>
	);
};

export default NewsItem;

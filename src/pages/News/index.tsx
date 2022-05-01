import React, { useState, useMemo, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/ui/Spinner';
import { userSelector } from '../../redux/selectors/userSelector';
import cn from 'classnames';
import { matchSorter } from 'match-sorter';

import styles from './News.module.scss';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ModalThx from '../../components/ui/ModalThx';
import FormController from '../../components/FormController';
import SearchInput from '../../components/ui/SearchInput';
import { selectNews } from '../../redux/slices/newsSlice';
import NewsForm from '../../components/Forms/NewsForm';
import CurrentNews from '../../components/NewsItem';

const News = () => {
	const user = useSelector(userSelector);
	const { news, isLoaded } = useSelector(selectNews);
	const [showPopupCreate, setshowPopupCreate] = useState(false);
	const [searchVal, setSearchVal] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	};

	const tglPopupNews = () => {
		setshowPopupCreate(!showPopupCreate);
	};

	const MatchSorter = useMemo(() => {
		if (!searchVal) {
			return news;
		}
		return matchSorter(news, searchVal, {
			keys: ['title', 'desc', 'created_at']
		});
	}, [news, searchVal]);

	const isUser = user && user?.user_metadata.admin !== 'Profilance Group';

	return (
		<>
			<section className={styles.news}>
				<h2 className={styles.news__title}>News</h2>
				{!isLoaded ? (
					<Spinner />
				) : (
					<>
						{!!news.length && (
							<SearchInput
								className={styles.news__search}
								value={searchVal}
								handleChange={handleChange}
							/>
						)}
						{isUser && (
							<Button className={styles.news__new} handleClick={tglPopupNews}>
								Add news +
							</Button>
						)}
						<>
							{news.length ? (
								<>
									{MatchSorter.length ? (
										<ul className={cn(styles.news__list, styles.newsList)}>
											{MatchSorter.map(newsItem => {
												return (
													<CurrentNews
														key={newsItem.id}
														{...newsItem}
														className={styles.newsList__item}
													/>
												);
											})}
										</ul>
									) : (
										<p className={styles.news__desc}>No matches</p>
									)}
								</>
							) : (
								<p className={styles.news__desc}>News list is empty</p>
							)}
						</>
					</>
				)}
			</section>

			{showPopupCreate && (
				<Modal hide={tglPopupNews}>
					<FormController>
						{(isShowForm, setShowThx) =>
							isShowForm ? (
								<NewsForm onSuccess={setShowThx} />
							) : (
								<ModalThx hide={tglPopupNews} desc='Contact created' />
							)
						}
					</FormController>
				</Modal>
			)}
		</>
	);
};

export default News;

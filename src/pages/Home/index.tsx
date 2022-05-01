import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';

import styles from './Home.module.scss';

const Home: FC = () => {
	const user = useSelector(userSelector);

	return (
		<section className={styles.home}>
			<h2 className={styles.home__title}>
				Hellow, {user ? user.email?.replace('@gmail.com', '') : 'Guest'}
			</h2>
		</section>
	);
};

export default Home;

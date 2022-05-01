import React, { StrictMode } from 'react';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/reducers';
import App from './App';
import './assets/style/index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLDivElement
);

root.render(
	<StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</StrictMode>
);


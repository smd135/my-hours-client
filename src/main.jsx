import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router basename="/">
		<Provider store={store}>
			<NextUIProvider>
				<App />
			</NextUIProvider>
		</Provider>
	</Router>
);

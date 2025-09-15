import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import {Provider} from 'react-redux'
import { persistor, store } from './redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import { ThemeProvider } from '@emotion/react';
import { theme } from './Theme';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
   <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App/>
    </ThemeProvider>
    </Provider>
    </PersistGate>
  </React.StrictMode>
);
// Enregistrement du service worker pour PWA
serviceWorkerRegistration.register();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

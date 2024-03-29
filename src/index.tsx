import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/ConfigureStore";
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history = createBrowserHistory();

root.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
        <App />
        </SnackbarProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

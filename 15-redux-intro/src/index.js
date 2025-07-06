import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

store.dispatch({
    type: 'account/deposit',
    payload: 250,
});

console.log(store.getState());

import React from 'react';
import ReactDOM from 'react-dom/client';
import { pizzaData } from './data';
import './index.css';

function App() {
    console.log(pizzaData);
    return (
        <div className='container'>
            <Pizza />
        </div>
    );
}

function Pizza() {
    return (
        <div>
            <img src='pizzas/spinaci.jpg' alt='Pizza Spinaci' />
            <h2>Pizza Spinaci</h2>
            <p>Tomato, mozarella, spinach, and ricotta cheese</p>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

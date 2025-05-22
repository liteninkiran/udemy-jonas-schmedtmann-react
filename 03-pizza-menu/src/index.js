import React from 'react';
import ReactDOM from 'react-dom/client';
import { pizzaData } from './data';
import './index.css';

function App() {
    console.log(pizzaData);
    return (
        <div className='container'>
            <Header />
            <Menu />
            <Footer />
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

function Header() {
    const style = {};

    return (
        <header className='header'>
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    return (
        <div>
            <h2>Our Menu</h2>
            <Pizza />
        </div>
    );
}

function Footer() {
    return React.createElement('footer', null, 'We are currently open!');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

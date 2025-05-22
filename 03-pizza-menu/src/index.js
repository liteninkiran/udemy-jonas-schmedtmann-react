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
            <h3>Pizza Spinaci</h3>
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
        <main className='menu'>
            <h2>Our Menu</h2>
            <Pizza />
        </main>
    );
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;
    const openingTimes = `${openHour}:00 and ${closeHour}:00`;

    return (
        <footer className='footer'>
            {isOpen ? (
                <p>We are open</p>
            ) : (
                <p>We are happy to welcome you between {openingTimes}.</p>
            )}
        </footer>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

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

function Pizza(props) {
    return (
        <div className='pizza'>
            <img src={props.photo} alt={props.name} />
            <div>
                <h3>{props.name}</h3>
                <p>{props.ingredients}</p>
                <span>£{props.price}</span>
            </div>
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
            <Pizza
                name='Pizza Spinaci'
                ingredients='Tomato, mozarella, spinach, and ricotta cheese'
                photo='pizzas/spinaci.jpg'
                price={10}
            />
            <Pizza
                name='Pizza Funghi'
                ingredients='Tomato, mushrooms'
                photo='pizzas/funghi.jpg'
                price={12}
            />
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

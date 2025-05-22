import React from 'react';
import ReactDOM from 'react-dom/client';
import { pizzaData } from './data';
import './index.css';

function App() {
    return (
        <div className='container'>
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Pizza({ pizza }) {
    return (
        <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
            <img src={pizza.photoName} alt={pizza.name} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? 'SOLD OUT' : pizza.price}</span>
            </div>
        </li>
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
    const getPizza = (pizza) => <Pizza key={pizza.name} pizza={pizza} />;
    const numPizzas = pizzaData.length;
    return (
        <main className='menu'>
            <h2>Our Menu</h2>
            {numPizzas > 0 ? (
                <>
                    <p>
                        Authentic Italian cuisine. {numPizzas} creative dishes
                        to choose from. All from our stone oven, all organic,
                        all delicious.
                    </p>
                    <ul className='pizza-list'>{pizzaData.map(getPizza)}</ul>
                </>
            ) : (
                <p>
                    We're still working on our menu. Please come back later :)
                </p>
            )}
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
                <Order openingTimes={openingTimes} />
            ) : (
                <p>We are happy to welcome you between {openingTimes}.</p>
            )}
        </footer>
    );
}

function Order({ openingTimes }) {
    return (
        <div className='order'>
            <p>
                We are open from {openingTimes}. Come visit us or order online.
            </p>
            <button className='btn'>Order</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

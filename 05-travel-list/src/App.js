import { useState } from 'react';

export default function App() {
    const [items, setItems] = useState([]);
    const handleAddItems = (item) => setItems((items) => [...items, item]);
    return (
        <div className='app'>
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const options = Array.from({ length: 20 }, (_, i) => i + 1);
    const mapFn = (num) => (
        <option value={num} key={num}>
            {num}
        </option>
    );
    const resetForm = () => {
        setDescription('');
        setQuantity(1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description) return;
        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        onAddItems(newItem);
        resetForm();
    };
    const handleOnDescriptionChange = (e) => setDescription(e.target.value);
    const handleOnQuantityChange = (e) => setQuantity(Number(e.target.value));

    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select value={quantity} onChange={handleOnQuantityChange}>
                {options.map(mapFn)}
            </select>
            <input
                type='text'
                placeholder='Item...'
                value={description}
                onChange={handleOnDescriptionChange}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items }) {
    const mapFn = (item) => <Item item={item} key={item.id} />;
    return (
        <div className='list'>
            <ul>{items.map(mapFn)}</ul>
        </div>
    );
}

function Stats() {
    return (
        <footer className='stats'>
            <em>
                '💼 You have 1 items on your list, and you already packed 1
                (100%)'
            </em>
        </footer>
    );
}

function Item({ item }) {
    return (
        <li>
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

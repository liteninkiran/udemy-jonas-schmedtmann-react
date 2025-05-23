import { useState } from 'react';

export default function App() {
    const [items, setItems] = useState([]);
    const mapFn = (item, id) =>
        item.id === id ? { ...item, packed: !item.packed } : item;
    const deleteItem = (items, id) => items.filter((item) => item.id !== id);
    const toggleItem = (items, id) => items.map((item) => mapFn(item, id));
    const handleAddItems = (item) => setItems((items) => [...items, item]);
    const handleDeleteItem = (id) => setItems((items) => deleteItem(items, id));
    const handleToggleItem = (id) => setItems((items) => toggleItem(items, id));
    return (
        <div className='app'>
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
    const mapFn = (item) => (
        <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
        />
    );
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

function Item({ item, onDeleteItem, onToggleItem }) {
    const onChange = () => onToggleItem(item.id);
    const onClick = () => onDeleteItem(item.id);
    return (
        <li>
            <input type='checkbox' value={item.packed} onChange={onChange} />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={onClick}>❌</button>
        </li>
    );
}

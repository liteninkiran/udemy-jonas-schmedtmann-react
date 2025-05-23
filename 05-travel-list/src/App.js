import { useState } from 'react';

const confirmDelete = 'Are you sure you want to delete all items?';

export default function App() {
    const [items, setItems] = useState([]);
    const mapFn = (item, id) =>
        item.id === id ? { ...item, packed: !item.packed } : item;
    const deleteItem = (items, id) => items.filter((item) => item.id !== id);
    const toggleItem = (items, id) => items.map((item) => mapFn(item, id));
    const handleAddItems = (item) => setItems((items) => [...items, item]);
    const handleDeleteItem = (id) => setItems((items) => deleteItem(items, id));
    const handleToggleItem = (id) => setItems((items) => toggleItem(items, id));
    const handleClearList = () => {
        if (window.confirm(confirmDelete)) {
            setItems([]);
        }
    };

    return (
        <div className='app'>
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
    const [sortBy, setSortBy] = useState('input');
    const onChange = (e) => setSortBy(e.target.value);
    const mapFn = (item) => (
        <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
        />
    );

    let sortedItems = [];

    const sortByDescription = (a, b) =>
        a.description.localeCompare(b.description);
    const sortByPacked = (a, b) => Number(a.packed) - Number(b.packed);

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === 'descr') sortedItems = items.slice().sort(sortByDescription);
    if (sortBy === 'packd') sortedItems = items.slice().sort(sortByPacked);

    return (
        <div className='list'>
            <ul>{sortedItems.map(mapFn)}</ul>

            <div className='actions'>
                <select value={sortBy} onChange={onChange}>
                    <option value='input'>Sort by input order</option>
                    <option value='descr'>Sort by description</option>
                    <option value='packd'>Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    );
}

function Stats({ items }) {
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const pctPacked = (numPacked / numItems) * 100;
    const readyText = 'You got everything! Ready to go ✈️';
    const unreadyText = ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${pctPacked}%)`;
    const notStartedText = 'Start adding some items to your packing list 🚀';
    const startedText = pctPacked === 100 ? readyText : unreadyText;
    return (
        <footer className='stats'>
            <em>{items.length === 0 ? notStartedText : startedText}</em>
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

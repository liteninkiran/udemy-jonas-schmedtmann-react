import { useState } from 'react';

import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

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

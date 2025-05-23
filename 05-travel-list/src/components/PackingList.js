import { useState } from 'react';

import Item from './Item';

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
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
};

export default PackingList;

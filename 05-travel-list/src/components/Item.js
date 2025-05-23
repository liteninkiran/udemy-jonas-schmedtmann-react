const Item = ({ item, onDeleteItem, onToggleItem }) => {
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
};

export default Item;

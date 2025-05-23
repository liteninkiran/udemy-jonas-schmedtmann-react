const initialItems = [
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: true },
    { id: 3, description: 'Charger', quantity: 1, packed: false },
];

export default function App() {
    return (
        <div className='app'>
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
    const options = Array.from({ length: 20 }, (_, i) => i + 1);
    const mapFn = (num) => (
        <option value={num} key={num}>
            {num}
        </option>
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    };
    return (
        <form className='add-form' onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip?</h3>
            <select>{options.map(mapFn)}</select>
            <input type='text' placeholder='Item...' />
            <button>Add</button>
        </form>
    );
}

function PackingList() {
    const mapFn = (item) => <Item item={item} key={item.id} />;
    return (
        <div className='list'>
            <ul>{initialItems.map(mapFn)}</ul>
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

import { useRef } from 'react';
import { useKeypress } from '../hooks/useKeypress';

const Search = ({ movies, query, setQuery }) => {
    const inputRef = useRef(null);
    const el = inputRef.current;
    const callback = () => {
        if (document.activeElement === el) {
            return;
        }
        el.focus();
        setQuery('');
    };

    useKeypress('keydown', 'NumpadEnter', callback);

    const onChange = (e) => setQuery(e.target.value);

    return (
        <>
            <div className='logo'>
                <span role='img'>🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <input
                className='search'
                type='text'
                placeholder='Search movies...'
                value={query}
                onChange={onChange}
                ref={inputRef}
            />
            <p className='num-results'>
                Found <strong>{movies.length}</strong> results
            </p>
        </>
    );
};

export default Search;

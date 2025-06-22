import { useEffect, useRef } from 'react';

const focusKeys = ['Enter', 'NumpadEnter'];

const Search = ({ movies, query, setQuery }) => {
    const inputRef = useRef(null);

    const onChange = (e) => setQuery(e.target.value);

    useEffect(() => {
        const type = 'keydown';
        const el = inputRef.current;
        const listener = (e) => {
            if (document.activeElement === el) {
                return;
            }
            if (focusKeys.includes(e.code)) {
                el.focus();
                setQuery('');
            }
        };
        document.addEventListener(type, listener);

        return () => document.removeEventListener(type, listener);
    }, [setQuery]);

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

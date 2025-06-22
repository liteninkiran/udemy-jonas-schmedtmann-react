import { useEffect } from 'react';

const Search = ({ movies, query, setQuery }) => {
    const onChange = (e) => setQuery(e.target.value);

    useEffect(() => {
        const el = document.querySelector('.search');
        console.log(el);
        el.focus();
    }, []);

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
            />
            <p className='num-results'>
                Found <strong>{movies.length}</strong> results
            </p>
        </>
    );
};

export default Search;

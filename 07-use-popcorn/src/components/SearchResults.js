import { useState } from 'react';
import SearchResult from './SearchResult';

const SearchResults = ({ movies }) => {
    const [isOpen, setIsOpen] = useState(true);
    const mapFn = (movie) => <SearchResult movie={movie} key={movie.imdbID} />;
    const onClick = () => setIsOpen((open) => !open);
    return (
        <div className='box'>
            <button className='btn-toggle' onClick={onClick}>
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && <ul className='list'>{movies?.map(mapFn)}</ul>}
        </div>
    );
};

export default SearchResults;

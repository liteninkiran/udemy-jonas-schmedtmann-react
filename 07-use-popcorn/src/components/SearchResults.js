import { useState } from 'react';
import ListItem from './ListItem';

const SearchResults = ({ movies }) => {
    const [isOpen, setIsOpen] = useState(true);
    const mapFn = (movie) => (
        <ListItem movie={movie} type={2} key={movie.imdbID} />
    );
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

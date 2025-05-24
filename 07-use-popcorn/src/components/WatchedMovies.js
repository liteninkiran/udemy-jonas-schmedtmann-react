import { useState } from 'react';
import { tempWatchedData } from '../data';
import Summary from './Summary';
import WatchedList from './WatchedList';

const WatchedMovies = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <div className='box'>
            <button
                className='btn-toggle'
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && (
                <>
                    <Summary watched={watched} />
                    <WatchedList watched={watched} />
                </>
            )}
        </div>
    );
};

export default WatchedMovies;

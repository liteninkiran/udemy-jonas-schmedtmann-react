import { useState } from 'react';
import { tempWatchedData } from '../data';
import Summary from './Summary';
import WatchedList from './WatchedList';

const WatchedMovies = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);
    const onClick = () => setIsOpen((open) => !open);
    const icon = isOpen ? '–' : '+';

    return (
        <div className='box'>
            <button className='btn-toggle' onClick={onClick}>
                {icon}
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

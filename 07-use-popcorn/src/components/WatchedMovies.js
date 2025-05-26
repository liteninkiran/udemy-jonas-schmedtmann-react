import { useState } from 'react';
import { tempWatchedData } from '../data';
import Summary from './Summary';
import WatchedList from './WatchedList';
import ListBox from './ListBox';

const WatchedMovies = () => {
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <ListBox>
            <Summary watched={watched} />
            <WatchedList watched={watched} />
        </ListBox>
    );
};

export default WatchedMovies;

import { useState } from 'react';
import Summary from './Summary';
import WatchedList from './WatchedList';
import ListBox from './ListBox';

const WatchedMovies = () => {
    const [watched, setWatched] = useState([]);

    return (
        <ListBox>
            <Summary watched={watched} />
            <WatchedList watched={watched} />
        </ListBox>
    );
};

export default WatchedMovies;

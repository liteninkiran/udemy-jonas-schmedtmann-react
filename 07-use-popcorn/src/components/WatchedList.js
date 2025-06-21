import ListItem from './ListItem';

const WatchedList = ({ watched, onDeleteWatched }) => {
    const mapFn = (movie) => (
        <ListItem
            movie={movie}
            key={movie.imdbId}
            handleSelectMovie={() => {}}
            onDeleteWatched={onDeleteWatched}
        />
    );
    return <ul className='list'>{watched.map(mapFn)}</ul>;
};

export default WatchedList;

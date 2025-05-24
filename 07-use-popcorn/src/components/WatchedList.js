import WatchedListItem from './WatchedListItem';

const WatchedList = ({ watched }) => {
    const mapFn = (movie) => (
        <WatchedListItem movie={movie} key={movie.imdbID} />
    );
    return <ul className='list'>{watched.map(mapFn)}</ul>;
};

export default WatchedList;

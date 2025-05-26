import ListItem from './ListItem';

const WatchedList = ({ watched }) => {
    const mapFn = (movie) => <ListItem movie={movie} key={movie.imdbID} />;
    return <ul className='list'>{watched.map(mapFn)}</ul>;
};

export default WatchedList;

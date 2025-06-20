import ListItem from './ListItem';

const MovieList = ({ movies }) => {
    const mapFn = (movie) => (
        <ListItem movie={movie} type={2} key={movie.imdbID} />
    );
    return <ul className='list'>{movies?.map(mapFn)}</ul>;
};

export default MovieList;

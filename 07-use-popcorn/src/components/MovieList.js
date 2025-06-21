import ListItem from './ListItem';

const MovieList = ({ movies, handleSelectMovie }) => {
    const mapFn = (movie) => (
        <ListItem
            movie={movie}
            type={2}
            key={movie.imdbID}
            handleSelectMovie={handleSelectMovie}
        />
    );
    return <ul className='list list-movies'>{movies?.map(mapFn)}</ul>;
};

export default MovieList;

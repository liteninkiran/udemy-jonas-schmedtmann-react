import ListItem from './ListItem';
import ListBox from './ListBox';

const MovieList = ({ movies }) => {
    const mapFn = (movie) => (
        <ListItem movie={movie} type={2} key={movie.imdbID} />
    );
    return (
        <ListBox>
            <ul className='list'>{movies?.map(mapFn)}</ul>
        </ListBox>
    );
};

export default MovieList;

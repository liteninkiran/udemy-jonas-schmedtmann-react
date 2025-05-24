import MovieInfo from './MovieInfo';

const SearchResult = ({ movie }) => {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <MovieInfo icon='🗓' metric={movie.Year} text='' />
            </div>
        </li>
    );
};

export default SearchResult;

import MovieInfo from './MovieInfo';

const WatchedListItem = ({ movie }) => {
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <MovieInfo icon='⭐️' metric={movie.imdbRating} text='' />
                <MovieInfo icon='🌟' metric={movie.userRating} text='' />
                <MovieInfo icon='⏳' metric={movie.runtime} text='min' />
            </div>
        </li>
    );
};

export default WatchedListItem;

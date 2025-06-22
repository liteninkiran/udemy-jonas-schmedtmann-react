import MovieInfo from './MovieInfo';

const ListItem = ({ movie, handleSelectMovie, onDeleteWatched, type = 1 }) => {
    const movieInfo =
        type === 1 ? (
            <>
                <MovieInfo icon='⭐️' metric={movie.imdbRating} text='' />
                <MovieInfo icon='🌟' metric={movie.userRating} text='' />
                <MovieInfo icon='⏳' metric={movie.runtime} text='min' />
            </>
        ) : (
            <MovieInfo icon='📅' metric={movie.Year} text='' />
        );
    return (
        <li
            key={`ListItem ${movie.imdbId}`}
            onClick={() => handleSelectMovie(movie.imdbId)}
        >
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>{movieInfo}</div>
            {onDeleteWatched && (
                <button
                    className='btn-delete'
                    onClick={() => onDeleteWatched(movie.imdbId)}
                >
                    X
                </button>
            )}
        </li>
    );
};

export default ListItem;

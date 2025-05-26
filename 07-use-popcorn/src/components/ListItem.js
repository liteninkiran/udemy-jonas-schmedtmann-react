import MovieInfo from './MovieInfo';

const ListItem = ({ movie, type = 1 }) => {
    const movieInfo =
        type === 1 ? (
            <>
                <MovieInfo icon='⭐️' metric={movie.imdbRating} text='' />
                <MovieInfo icon='🌟' metric={movie.userRating} text='' />
                <MovieInfo icon='⏳' metric={movie.runtime} text='min' />
            </>
        ) : (
            <MovieInfo icon='🗓' metric={movie.Year} text='' />
        );
    return (
        <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>{movieInfo}</div>
        </li>
    );
};

export default ListItem;

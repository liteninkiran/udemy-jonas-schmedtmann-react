import { useEffect, useState } from 'react';
import { key } from '../keys';
import StarRating from './stars/StarRating';
import Loader from './Loader';

const baseUrl = 'http://www.omdbapi.com/';

const MovieDetails = ({ movieId, onCloseMovie, onAddWatched, watched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        imdbID: imdbId,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const fetchMovieDetails = () => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const url = `${baseUrl}?apikey=${key}&i=${movieId}`;
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        };
        getMovieDetails();
        setUserRating(0);
    };

    const updateTitle = () => {
        if (!title) return;
        document.title = `Movie | ${title}`;
    };

    const handleAdd = () => {
        const newMovie = {
            imdbId: movieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        };
        onAddWatched(newMovie);
        onCloseMovie();
    };

    useEffect(fetchMovieDetails, [movieId]);
    useEffect(updateTitle, [title]);

    const isWatched = watched.some((m) => m.imdbId === imdbId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbId === movieId
    )?.userRating;

    return (
        <div className='details'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className='btn-back' onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of {title}`} />
                        <div className='details-overview'>
                            <h2>{title}</h2>
                            <p>
                                <span>⏳</span>
                                {released} &bull; {runtime}
                            </p>
                            <p>
                                <span>📁</span>
                                {genre}
                            </p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDB Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className='rating'>
                            {isWatched ? (
                                <p>
                                    You rated this movie {watchedUserRating}
                                    <span>⭐</span>
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                        defaultRating={userRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className='btn-add'
                                            onClick={handleAdd}
                                        >
                                            Add to List
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed By {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;

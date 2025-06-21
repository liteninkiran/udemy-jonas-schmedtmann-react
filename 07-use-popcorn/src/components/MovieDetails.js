import { useEffect, useState } from 'react';
import { key } from '../keys';
import StarRating from './stars/StarRating';
import Loader from './Loader';

const baseUrl = 'http://www.omdbapi.com/';

const MovieDetails = ({ movieId, handleCloseMovie }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const fn = () => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const url = `${baseUrl}?apikey=${key}&i=${movieId}`;
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        };
        getMovieDetails();
    };

    useEffect(fn, [movieId]);

    return (
        <div className='details'>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className='btn-back' onClick={handleCloseMovie}>
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
                            <StarRating maxRating={10} size={24} />
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

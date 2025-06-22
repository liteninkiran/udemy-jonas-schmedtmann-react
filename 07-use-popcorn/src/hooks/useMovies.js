import { useEffect, useState } from 'react';
import { key } from './../keys';

const baseUrl = 'http://www.omdbapi.com/';

export const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = () => {
        const controller = new AbortController();
        const fetchMovies = async () => {
            const url = `${baseUrl}?apikey=${key}&s=${query}`;
            try {
                setIsLoading(true);
                setError('');
                const options = {
                    signal: controller.signal,
                };
                const res = await fetch(url, options);

                if (!res.ok) {
                    throw new Error(
                        'Something went wrong with fetching movies'
                    );
                }

                const data = await res.json();

                if (data.Response === 'False') {
                    throw new Error('No movies match this search criteria');
                }

                const mapMovie = (movie) => ({
                    title: movie.Title,
                    poster: movie.Poster,
                    type: movie.Type,
                    year: movie.Year,
                    imdbId: movie.imdbID,
                });

                setMovies(data.Search.map(mapMovie));
                setError('');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (query.length < 3) {
            setMovies([]);
            setError('Enter at least 3 characters in the search bar');
            return;
        }

        fetchMovies();

        return () => controller.abort();
    };

    useEffect(fetchData, [query]);

    return { movies, isLoading, error };
};

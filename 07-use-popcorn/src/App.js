import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import Loader from './components/Loader';
import ListBox from './components/ListBox';
import ErrorMessage from './components/ErrorMessage';
import Summary from './components/Summary';
import WatchedList from './components/WatchedList';
import MovieDetails from './components/MovieDetails';
import { key } from './keys';

const baseUrl = 'http://www.omdbapi.com/';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('Interstellar');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [watched, setWatched] = useState([]);

    const handleSelectMovie = (id) =>
        setSelectedMovie((curr) => (id === curr ? null : id));
    const handleCloseMovie = () => setSelectedMovie(null);
    const handleAddWatched = (movie) => setWatched((curr) => [...curr, movie]);
    const handleDeleteWatched = (id) =>
        setWatched((curr) => curr.filter((movie) => movie.imdbId !== id));

    const fetchData = () => {
        const fetchMovies = async () => {
            const url = `${baseUrl}?apikey=${key}&s=${query}`;
            try {
                setIsLoading(true);
                setError('');
                const res = await fetch(url);

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
            } catch (err) {
                setError(err.message);
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
    };

    useEffect(fetchData, [query]);

    return (
        <>
            <NavBar>
                <Search movies={movies} query={query} setQuery={setQuery} />
            </NavBar>
            <Main>
                <ListBox>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <MovieList
                            movies={movies}
                            handleSelectMovie={handleSelectMovie}
                        />
                    )}
                </ListBox>
                <ListBox>
                    {selectedMovie ? (
                        <MovieDetails
                            movieId={selectedMovie}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <Summary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </ListBox>
            </Main>
        </>
    );
}

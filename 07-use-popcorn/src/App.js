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
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

export default function App() {
    const [query, setQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [watched, setWatched] = useLocalStorageState([], 'watched');

    const handleCloseMovie = () => setSelectedMovie(null);
    const handleSelectMovie = (id) =>
        setSelectedMovie((curr) => (id === curr ? null : id));
    const handleAddWatched = (movie) => setWatched((curr) => [...curr, movie]);
    const handleDeleteWatched = (id) =>
        setWatched((curr) => curr.filter((movie) => movie.imdbId !== id));

    const { movies, isLoading, error } = useMovies(query);

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

import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import WatchedMovies from './components/WatchedMovies';
import Loader from './components/Loader';
import ListBox from './components/ListBox';
import ErrorMessage from './components/ErrorMessage';

const key = '5b8881e2';
const baseUrl = 'http://www.omdbapi.com/';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    // const query = 'interstellar';
    const query = 'sdafdasd';
    const url = `${baseUrl}?apikey=${key}&s=${query}`;

    const fetchData = () => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
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

                setMovies(data.Search);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    };

    useEffect(fetchData, [url]);

    return (
        <>
            <NavBar>
                <Search movies={movies} />
            </NavBar>
            <Main>
                <ListBox>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        <ErrorMessage message={error} />
                    ) : (
                        <MovieList movies={movies} />
                    )}
                </ListBox>
                <WatchedMovies />
            </Main>
        </>
    );
}

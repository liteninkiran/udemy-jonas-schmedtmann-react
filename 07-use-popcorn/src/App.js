import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import WatchedMovies from './components/WatchedMovies';
import Loader from './components/Loader';
import ListBox from './components/ListBox';

const key = '5b8881e2';
const baseUrl = 'http://www.omdbapi.com/';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const query = 'interstellar';
    const url = `${baseUrl}?apikey=${key}&s=${query}`;

    const fetchData = () => {
        async function fetchMovies() {
            setIsLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.Search);
            setIsLoading(false);
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
                    {isLoading ? <Loader /> : <MovieList movies={movies} />}
                </ListBox>
                <WatchedMovies />
            </Main>
        </>
    );
}

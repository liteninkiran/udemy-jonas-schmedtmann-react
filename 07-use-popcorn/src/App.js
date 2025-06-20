import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import WatchedMovies from './components/WatchedMovies';

const key = '5b8881e2';
const baseUrl = 'http://www.omdbapi.com/';

export default function App() {
    const [movies, setMovies] = useState([]);
    const query = 'interstellar';
    const url = `${baseUrl}?apikey=${key}&s=${query}`;

    const fetchData = () => {
        async function fetchMovies() {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.Search);
            console.log(data.Search);
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
                <MovieList movies={movies} />
                <WatchedMovies />
            </Main>
        </>
    );
}

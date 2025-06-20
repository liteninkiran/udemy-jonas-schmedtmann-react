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

    const searchTerm = 'interstellar';
    const url = `${baseUrl}?apikey=${key}&s=${searchTerm}`;
    const fetchData = () =>
        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.Search));

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

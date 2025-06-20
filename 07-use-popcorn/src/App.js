import { useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import WatchedMovies from './components/WatchedMovies';

const key = '5b8881e2';

export default function App() {
    const [movies, setMovies] = useState([]);

    const url = `http://www.omdbapi.com/?apikey=${key}&s=interstellar`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data.Search));

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

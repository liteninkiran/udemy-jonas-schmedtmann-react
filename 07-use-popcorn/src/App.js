import { useState } from 'react';
import { tempMovieData } from './data';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Search from './components/Search';
import MovieList from './components/MovieList';
import WatchedMovies from './components/WatchedMovies';

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

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

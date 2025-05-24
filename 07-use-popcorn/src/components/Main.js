import SearchResults from './SearchResults';
import WatchedMovies from './WatchedMovies';

const Main = ({ movies }) => {
    return (
        <main className='main'>
            <SearchResults movies={movies} />
            <WatchedMovies />
        </main>
    );
};

export default Main;

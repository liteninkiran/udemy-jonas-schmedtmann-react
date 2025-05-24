import MovieInfo from './MovieInfo';

const reducer = (acc, cur, _i, arr) => acc + cur / arr.length;
const average = (arr) => arr.reduce(reducer, 0);

const Summary = ({ watched }) => {
    const averages = {
        imdb: average(watched.map((movie) => movie.imdbRating)),
        rating: average(watched.map((movie) => movie.userRating)),
        runtime: average(watched.map((movie) => movie.runtime)),
    };

    return (
        <div className='summary'>
            <h2>Movies you watched</h2>
            <div>
                <MovieInfo icon='#️⃣' metric={watched.length} text='movies' />
                <MovieInfo icon='⭐️' metric={averages.imdb} text='' />
                <MovieInfo icon='🌟' metric={averages.rating} text='' />
                <MovieInfo icon='⏳' metric={averages.runtime} text='min' />
            </div>
        </div>
    );
};

export default Summary;

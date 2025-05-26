import { useState } from 'react';
import StarRating from './StarRating';

const Test = () => {
    const [movieRating, setMovieRating] = useState(0);
    return (
        <div>
            <StarRating
                colour='blue'
                maxRating={10}
                onSetRating={setMovieRating}
            />
            <p>This movies was rated {movieRating} stars</p>
        </div>
    );
};

export default Test;

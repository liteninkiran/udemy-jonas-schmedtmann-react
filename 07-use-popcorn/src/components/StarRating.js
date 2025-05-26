import { useState } from 'react';
import Star from './Star';

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
};

const textStyle = {
    lineHeight: '1',
    margin: '0',
};

const StarRating = ({ maxRating = 5 }) => {
    const [rating, setRating] = useState(0);
    const options = { length: maxRating };
    const onClick = (rating) => setRating(rating);
    const mapFn = (_, i) => (
        <span key={i}>
            <Star
                onClick={() => onClick(i + 1)}
                full={rating >= i + 1}
                key={i}
            />
        </span>
    );
    const stars = Array.from(options, mapFn);
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>{stars}</div>
            <p style={textStyle}>{rating || ''}</p>
        </div>
    );
};

export default StarRating;

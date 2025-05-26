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

const StarRating = ({
    maxRating = 5,
    defaultRating = 0,
    colour = '#fcc419',
    size = 48,
    className = '',
    labels = [],
    onSetRating,
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: '1',
        margin: '0',
        color: colour,
        fontSize: `${size / 1.5}px`,
    };
    const handleSetRating = (score) => {
        setRating(score);
        onSetRating(score);
    };
    const getRating = () => tempRating || rating;
    const options = { length: maxRating };
    const mapFn = (_, i) => (
        <Star
            onClick={() => handleSetRating(i + 1)}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
            colour={colour}
            size={size}
            full={getRating() >= i + 1}
            key={i}
        />
    );
    const stars = Array.from(options, mapFn);
    const defaultLabel = tempRating || rating || '';
    const hasLabels = labels.length === maxRating;
    const getLabel = () => labels[getRating() - 1];
    const label = hasLabels ? getLabel() : defaultLabel;
    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>{stars}</div>
            <p style={textStyle}>{label}</p>
        </div>
    );
};

export default StarRating;

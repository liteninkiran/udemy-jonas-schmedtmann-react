const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
};

const textStyle = {
    lineHeight: '1',
    margin: '0',
};

const StarRating = ({ maxRating = 5 }) => {
    const options = { length: maxRating };
    const stars = Array.from(options, (_, i) => <span key={i}>S{i + 1}</span>);
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>{stars}</div>
            <p style={textStyle}>{maxRating}</p>
        </div>
    );
};

export default StarRating;

import StarSvg from './StarSvg';

const Star = ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    colour,
    size,
    full = true,
}) => {
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: 'block',
        cursor: 'pointer',
    };
    return (
        <span
            style={starStyle}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <StarSvg full={full} colour={colour} />
        </span>
    );
};

export default Star;

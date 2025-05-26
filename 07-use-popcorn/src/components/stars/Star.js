import StarSvg from './StarSvg';

const Star = ({
    onClick,
    onMouseEnter,
    onMouseLeave,
    colour = '#000',
    full = true,
}) => {
    const starStyle = {
        width: `${48}px`,
        height: `${48}px`,
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

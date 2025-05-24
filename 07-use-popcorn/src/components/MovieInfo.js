const MovieInfo = ({ icon, metric, text }) => {
    return (
        <p>
            <span>{icon}</span>
            <span>
                {metric} {text}
            </span>
        </p>
    );
};

export default MovieInfo;

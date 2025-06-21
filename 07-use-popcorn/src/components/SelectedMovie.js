const SelectedMovie = ({ movieId, handleCloseMovie }) => {
    return (
        <div className='details'>
            <button className='btn-back' onClick={handleCloseMovie}>
                &larr;
            </button>
            {movieId}
        </div>
    );
};

export default SelectedMovie;

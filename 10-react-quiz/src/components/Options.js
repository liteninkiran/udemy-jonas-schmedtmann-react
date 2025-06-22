const Options = ({ question }) => {
    const mapFn = (option) => (
        <button className='btn btn-option' key={option}>
            {option}
        </button>
    );
    return <div className='options'>{question.options.map(mapFn)}</div>;
};

export default Options;

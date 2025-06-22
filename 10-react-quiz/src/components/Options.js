const Options = ({ question, dispatch, answer }) => {
    const isAnswered = answer !== null;
    const correctAns = question.correctOption;
    const onSubmit = (payload) => dispatch({ type: 'newAnswer', payload });
    const rightWrongClass = (ans) => (ans === correctAns ? 'correct' : 'wrong');
    const validAnswerClass = (ans) => (isAnswered ? rightWrongClass(ans) : '');
    const answeredClass = (ans) => ans === answer && 'answer';
    const baseClass = 'btn btn-option';
    const getClasses = (ans) =>
        `${baseClass} ${answeredClass(ans)} ${validAnswerClass(ans)}`;

    const mapFn = (option, index) => (
        <button
            className={getClasses(index)}
            key={option}
            onClick={() => onSubmit(index)}
            disabled={isAnswered}
        >
            {option}
        </button>
    );
    return <div className='options'>{question.options.map(mapFn)}</div>;
};

export default Options;

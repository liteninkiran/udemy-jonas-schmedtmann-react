const NextButton = ({ dispatch, answer, index, numQuestions }) => {
    if (answer === null) return;
    const lastQuestion = index === numQuestions - 1;
    const buttonText = lastQuestion ? 'Finish' : 'Next';
    const dispatchType = lastQuestion ? 'finish' : 'nextQuestion';
    return (
        <button
            className='btn btn-ui'
            onClick={() => dispatch({ type: dispatchType })}
        >
            {buttonText}
        </button>
    );
};

export default NextButton;

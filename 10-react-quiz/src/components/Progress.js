const Progress = ({ index, numQuestions, points, maxPoints, answer }) => {
    const progressValue = index + Number(answer !== null);
    return (
        <header className='progress'>
            <progress max={numQuestions} value={progressValue} />
            <p>
                Question <strong>{index + 1}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    );
};

export default Progress;

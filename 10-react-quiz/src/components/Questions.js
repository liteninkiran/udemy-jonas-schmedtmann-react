import Options from './Options';

const Questions = ({ question }) => {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    );
};

export default Questions;

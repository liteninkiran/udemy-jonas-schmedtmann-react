import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import Progress from './components/Progress';

const initialState = {
    questions: [],
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'dataReceived':
            return { ...state, questions: action.payload, status: 'ready' };
        case 'dataFailed':
            return { ...state, status: 'error' };
        case 'start':
            return { ...state, status: 'active' };
        case 'newAnswer':
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case 'nextQuestion':
            return { ...state, index: state.index + 1, answer: null };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const App = () => {
    const [{ questions, status, index, answer, points }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'dataReceived', payload: data }))
            .catch((err) => dispatch({ type: 'dataFailed' }));
    }, []);

    return (
        <div className='app'>
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={questions.length}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            index={index}
                            numQuestions={questions.length}
                            points={points}
                            maxPoints={maxPoints}
                            answer={answer}
                        />
                        <Questions
                            question={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        {answer !== null && <NextButton dispatch={dispatch} />}
                    </>
                )}
            </Main>
        </div>
    );
};

export default App;

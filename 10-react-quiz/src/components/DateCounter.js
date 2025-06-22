import { useReducer } from 'react';

const initialState = {
    count: 0,
    step: 1,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'dec':
            return { ...state, count: state.count - state.step };
        case 'inc':
            return { ...state, count: state.count + state.step };
        case 'setCount':
            return { ...state, count: action.payload };
        case 'setStep':
            return { ...state, step: action.payload };
        case 'reset':
            return initialState;
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
};

const DateCounter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    // This mutates the date object.
    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + count);

    const getTargetValue = (e) => Number(e.target.value);
    const getAction = (e, type) => ({ type, payload: getTargetValue(e) });

    const dec = () => dispatch({ type: 'dec' });
    const inc = () => dispatch({ type: 'inc' });
    const defineCount = (e) => dispatch(getAction(e, 'setCount'));
    const defineStep = (e) => dispatch(getAction(e, 'setStep'));
    const reset = () => dispatch({ type: 'reset' });

    return (
        <div className='counter'>
            <div>
                <input
                    type='range'
                    min='0'
                    max='10'
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};
export default DateCounter;

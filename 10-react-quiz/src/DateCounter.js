import { useReducer, useState } from 'react';

const reducer = (state, action) => {
    let newState;
    if (action.type === 'inc') newState = state + 1;
    if (action.type === 'dec') newState = state - 1;
    if (action.type === 'set') newState = action.payload;
    console.log('old state', state);
    console.log('new state', newState);
    console.log('action', action);
    return newState;
};

const DateCounter = () => {
    const [count, dispatch] = useReducer(reducer, 0);
    const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date('june 21 2027');
    date.setDate(date.getDate() + count);

    const getTargetValue = (e) => Number(e.target.value);
    const action = (e) => ({ type: 'set', payload: getTargetValue(e) });

    const dec = () => dispatch({ type: 'dec' });
    const inc = () => dispatch({ type: 'inc' });
    const defineCount = (e) => dispatch(action(e));
    const defineStep = (e) => setStep(getTargetValue(e));
    const reset = () => setStep(1);

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

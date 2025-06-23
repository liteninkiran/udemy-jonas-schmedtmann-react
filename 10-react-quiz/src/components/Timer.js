import { useEffect } from 'react';

const Timer = ({ dispatch, secondsRemaining }) => {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    const time = {
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0'),
    };
    const addTimer = () => {
        const incrementTimer = () => dispatch({ type: 'tick' });
        const stopTimer = () => clearInterval(id);
        const id = setInterval(incrementTimer, 1000);
        return stopTimer;
    };
    useEffect(addTimer, [dispatch]);
    return (
        <div className='timer'>
            {time.mins}:{time.secs}
        </div>
    );
};

export default Timer;

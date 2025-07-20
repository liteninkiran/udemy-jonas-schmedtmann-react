import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

const ERR_MSG = 'DarkModeContext was used outside of DarkModeProvider';

const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (context === undefined) throw new Error(ERR_MSG);
    return context;
};

export default useDarkMode;

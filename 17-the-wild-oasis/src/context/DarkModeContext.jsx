import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const SELECTOR = '(prefers-color-scheme: dark)';
const KEY = 'isDarkMode';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
    const initialState = window.matchMedia(SELECTOR).matches;
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(initialState, KEY);

    const effectFn = () => {
        const modes = ['dark-mode', 'light-mode'];
        const i = isDarkMode ? 0 : 1;
        document.documentElement.classList.add(modes[i]);
        document.documentElement.classList.remove(modes[1 - i]);
    };

    useEffect(effectFn, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((isDark) => !isDark);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export { DarkModeProvider, DarkModeContext };

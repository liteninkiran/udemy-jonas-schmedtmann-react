import { useEffect } from 'react';

export const useKeypress = (eventName, key, action) => {
    const listenForEscape = () => {
        const listener = (e) =>
            e.code.toLowerCase() === key.toLowerCase() && action?.();
        document.addEventListener(eventName, listener);
        return () => document.removeEventListener(eventName, listener);
    };
    useEffect(listenForEscape, [eventName, key, action]);
};

import { useEffect, useState } from 'react';

export const useLocalStorageState = (initialValue, key) => {
    const item = localStorage.getItem(key);
    const initialiserFn = () => (item ? JSON.parse(item) : initialValue);
    const addToStorage = () => localStorage.setItem(key, JSON.stringify(value));
    const [value, setValue] = useState(initialiserFn);
    useEffect(addToStorage, [key, value]);
    return [value, setValue];
};

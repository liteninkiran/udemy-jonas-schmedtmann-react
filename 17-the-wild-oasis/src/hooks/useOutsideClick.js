import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler, listenCapturing = true) => {
    const ref = useRef();

    const effectFn = () => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener('click', handleClick, listenCapturing);

        return () =>
            document.removeEventListener('click', handleClick, listenCapturing);
    };

    useEffect(effectFn, [handler, listenCapturing]);

    return ref;
};

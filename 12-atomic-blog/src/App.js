import { useEffect, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Archive from './components/Archive';
import Footer from './components/Footer';

import { PostProvider } from './PostContext';

const App = () => {
    const [isFakeDark, setIsFakeDark] = useState(false);

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    const effectFn = () => {
        document.documentElement.classList.toggle('fake-dark-mode');
    };
    useEffect(effectFn, [isFakeDark]);

    return (
        <section>
            <button
                onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                className='btn-fake-dark-mode'
            >
                {isFakeDark ? '☀️' : '🌙'}
            </button>
            <PostProvider>
                <Header />
                <Main />
                <Archive />
                <Footer />
            </PostProvider>
        </section>
    );
};

export default App;

import { createContext, useEffect, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Archive from './components/Archive';
import Footer from './components/Footer';

import { createRandomPost } from './helper';

const PostContext = createContext();

const App = () => {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [isFakeDark, setIsFakeDark] = useState(false);

    // Derived state. These are the posts that will actually be displayed
    const filterFn = (post) =>
        `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    const searchedPosts =
        searchQuery.length > 0 ? posts.filter(filterFn) : posts;

    const handleAddPost = (post) => setPosts((posts) => [post, ...posts]);
    const handleClearPosts = () => setPosts([]);

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    const effectFn = () => {
        document.documentElement.classList.toggle('fake-dark-mode');
    };
    useEffect(effectFn, [isFakeDark]);

    return (
        <PostContext.Provider
            value={{
                posts: searchedPosts,
                onClearPosts: handleClearPosts,
                onAddPost: handleAddPost,
                searchQuery,
                setSearchQuery,
            }}
        >
            <section>
                <button
                    onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                    className='btn-fake-dark-mode'
                >
                    {isFakeDark ? '☀️' : '🌙'}
                </button>

                <Header
                    posts={searchedPosts}
                    onClearPosts={handleClearPosts}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <Main posts={searchedPosts} onAddPost={handleAddPost} />
                <Archive onAddPost={handleAddPost} />
                <Footer />
            </section>
        </PostContext.Provider>
    );
};

export default App;

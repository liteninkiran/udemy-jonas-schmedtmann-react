import { createContext, useContext, useState } from 'react';
import { createRandomPost } from './helper';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState('');

    // Derived state. These are the posts that will actually be displayed
    const filterFn = (post) =>
        `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
    const searchedPosts =
        searchQuery.length > 0 ? posts.filter(filterFn) : posts;

    const handleAddPost = (post) => setPosts((posts) => [post, ...posts]);
    const handleClearPosts = () => setPosts([]);

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
            {children}
        </PostContext.Provider>
    );
};

const usePosts = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('PostContext was used outside of the PostProvider');
    }
    return context;
};

export { PostProvider, usePosts };

import { usePosts } from '../PostContext';

const SearchPosts = () => {
    const { searchQuery, setSearchQuery } = usePosts();
    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search posts...'
        />
    );
};

export default SearchPosts;

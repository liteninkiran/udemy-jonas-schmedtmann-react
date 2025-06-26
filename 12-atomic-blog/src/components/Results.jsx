import { useContext } from 'react';
import { PostContext } from '../App';

const Results = () => {
    const { posts } = useContext(PostContext);
    return <p>🚀 {posts.length} atomic posts found</p>;
};

export default Results;

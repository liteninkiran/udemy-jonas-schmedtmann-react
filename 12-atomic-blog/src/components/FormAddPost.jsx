import { useState } from 'react';
import { usePosts } from '../PostContext';

const FormAddPost = () => {
    const { onAddPost } = usePosts();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = function (e) {
        e.preventDefault();
        if (!body || !title) return;
        onAddPost({ title, body });
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Post title'
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='Post body'
            />
            <button>Add post</button>
        </form>
    );
};

export default FormAddPost;

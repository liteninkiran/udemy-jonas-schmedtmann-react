import { useState } from 'react';

const TabContent = ({ item }) => {
    console.log('Render');

    const [showDetails, setShowDetails] = useState(true);
    const [likes, setLikes] = useState(0);
    const handleInc = (i = 1) => setLikes((likes) => likes + i);
    const handleUndo = () => {
        setShowDetails(true);
        setLikes(0);
        console.log(likes, showDetails);
    };
    const handleUndoLater = () => setTimeout(handleUndo, 2000);

    return (
        <div className='tab-content'>
            <h4>{item.summary}</h4>
            {showDetails && <p>{item.details}</p>}

            <div className='tab-actions'>
                <button onClick={() => setShowDetails((h) => !h)}>
                    {showDetails ? 'Hide' : 'Show'} details
                </button>

                <div className='hearts-counter'>
                    <span>{likes} ❤️</span>
                    <button onClick={() => handleInc(1)}>+</button>
                    <button onClick={() => handleInc(3)}>+++</button>
                </div>
            </div>

            <div className='tab-undo'>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleUndoLater}>Undo in 2s</button>
            </div>
        </div>
    );
};

export default TabContent;

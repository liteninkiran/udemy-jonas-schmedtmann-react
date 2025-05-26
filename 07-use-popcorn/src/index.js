import React from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './components/stars/StarRating';
import Test from './components/stars/Test';
// import App from './App';
// import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <StarRating labels={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']} />
        <StarRating maxRating={10} defaultRating={3} colour='red' size={30} />
        <Test />
    </React.StrictMode>
);

import { useState } from 'react';

const ListBox = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const onClick = () => setIsOpen((open) => !open);
    const icon = isOpen ? '–' : '+';
    return (
        <div className='box'>
            <button className='btn-toggle' onClick={onClick}>
                {icon}
            </button>
            {isOpen && children}
        </div>
    );
};

export default ListBox;

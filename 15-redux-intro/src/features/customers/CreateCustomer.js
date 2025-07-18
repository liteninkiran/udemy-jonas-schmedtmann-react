import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCustomer } from './customerSlice';

const Customer = () => {
    const [fullName, setFullName] = useState('Davey Jones');
    const [nationalId, setNationalId] = useState('XYZ5');

    const dispatch = useDispatch();

    const handleClick = () => {
        if (!fullName || !nationalId) {
            return;
        }
        dispatch(createCustomer(fullName, nationalId));
    };

    return (
        <div>
            <h2>Create new customer</h2>
            <div className='inputs'>
                <div>
                    <label>Customer full name</label>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>National ID</label>
                    <input
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
                    />
                </div>
                <button onClick={handleClick}>Create new customer</button>
            </div>
        </div>
    );
};

export default Customer;

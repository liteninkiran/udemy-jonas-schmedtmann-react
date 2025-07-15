import { useEffect } from 'react';
import Heading from '@ui/Heading';
import Row from '@ui/Row';
import { getCabins } from '@services/apiCabins';

const Cabins = () => {
    const effectFn = () => {
        getCabins().then((data) => console.log(data));
    };

    useEffect(effectFn, []);

    return (
        <Row type='horizontal'>
            <Heading as='h1'>All cabins</Heading>
            <p>TEST</p>
        </Row>
    );
};

export default Cabins;

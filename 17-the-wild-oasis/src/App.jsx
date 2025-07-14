import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from '@ui/Button';
import Input from '@ui/Input';

const H1 = styled.h1`
    font-size: 60px;
    font-weight: 600;
`;

const StyledApp = styled.div`
    background-color: orangered;
    padding: 20px;
`;

const App = () => {
    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <H1>The Wild Oasis</H1>
                <Button onClick={() => alert('Check In')}>Check In</Button>
                <Button onClick={() => alert('Check Out')}>Check Out</Button>
                <Input type='number' placeholder='Number of guests' />
                <Input type='number' placeholder='Number of guests' />
            </StyledApp>
        </>
    );
};

export default App;

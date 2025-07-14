import styled from 'styled-components';

const H1 = styled.h1`
    font-size: 60px;
    font-weight: 600;
`;

const Button = styled.button`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
    border: none;
    border-radius: 7px;
    background-color: purple;
    color: white;
    margin: 20px;
    cursor: pointer;
`;

const Input = styled.input`
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
    background-color: orangered;
    padding: 20px;
    font-family: sans-serif;
`;

const App = () => {
    return (
        <StyledApp>
            <H1>The Wild Oasis</H1>
            <Button onClick={() => alert('Check In')}>Check In</Button>
            <Button onClick={() => alert('Check Out')}>Check Out</Button>
            <Input type='number' placeholder='Number of guests' />
        </StyledApp>
    );
};

export default App;

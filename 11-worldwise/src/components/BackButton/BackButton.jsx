import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const BackButton = () => {
    const nav = useNavigate();
    const clickBack = (e) => {
        e.preventDefault();
        nav(-1);
    };
    return (
        <Button type={'back'} onClick={clickBack}>
            &larr; Back
        </Button>
    );
};

export default BackButton;

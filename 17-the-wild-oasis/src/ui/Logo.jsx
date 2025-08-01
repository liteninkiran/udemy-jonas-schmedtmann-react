import useDarkMode from '../context/useDarkMode';
import styled from 'styled-components';

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    height: 9.6rem;
    width: auto;
`;

const Logo = () => {
    const { isDarkMode } = useDarkMode();
    const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

    return (
        <StyledLogo>
            <Img src={src} alt='Logo' />
        </StyledLogo>
    );
};

export default Logo;

import styled, { css } from 'styled-components';

const regular = css`
    padding: 2.4rem 4rem;

    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
`;

const modal = css`
    width: 80rem;
`;

const Form = styled.form`
    ${(props) => props.type !== 'modal' && regular}
    ${(props) => props.type === 'modal' && modal}
    
    overflow: hidden;
    font-size: 1.4rem;
`;

Form.defaultProps = {
    type: 'regular',
};

export default Form;

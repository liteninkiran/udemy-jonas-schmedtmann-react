import styled from 'styled-components';

const Textarea = styled.textarea`
    padding: 0.8rem 1.2rem;
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    width: 100%;
    height: 8rem;
    &:disabled {
        background-color: #f0f0f0;
        color: #999;
        cursor: not-allowed;
    }
`;

export default Textarea;

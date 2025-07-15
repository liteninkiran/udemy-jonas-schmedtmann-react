const success = {
    duration: 3000,
};

const error = {
    duration: 5000,
};

const style = {
    fontSize: '16px',
    maxWidth: '500px',
    padding: '16px 24px',
    backgroundColor: 'var(--color-grey-0)',
    color: 'var(--color-grey-700)',
};

const position = 'top-center';
const gutter = 12;
const containerStyle = { margin: '8px' };
const toastOptions = { success, error, style };

export const toasterProps = {
    position,
    gutter,
    containerStyle,
    toastOptions,
};

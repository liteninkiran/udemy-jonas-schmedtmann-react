const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false,
            };
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload,
            };

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan,
            };
        case 'account/convertingCurrency':
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
};

export const deposit = (amount, currency) => {
    if (currency === 'USD') {
        return {
            type: 'account/deposit',
            payload: amount,
        };
    }

    return async (dispatch, _getState) => {
        dispatch({ type: 'account/convertingCurrency' });
        const baseUrl = 'https://api.frankfurter.app/latest';
        const url = `${baseUrl}?amount=${amount}&from=${currency}&to=USD`;
        const res = await fetch(url);
        const data = await res.json();
        dispatch({
            type: 'account/deposit',
            payload: data.rates.USD,
        });
    };
};

export const withdraw = (amount) => ({
    type: 'account/withdraw',
    payload: amount,
});

export const requestLoan = (amount, purpose) => ({
    type: 'account/requestLoan',
    payload: { amount, purpose },
});

export const payLoan = () => ({
    type: 'account/payLoan',
});

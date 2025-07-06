import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                };
            },
            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            },
        },
        payLoan(state, _action) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convertingCurrency(state) {
            state.isLoading = true;
        },
    },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

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
        const obj = {
            type: 'account/deposit',
            payload: data.rates.USD,
        };
        dispatch(obj);
    };
};

export default accountSlice.reducer;

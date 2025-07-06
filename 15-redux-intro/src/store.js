import { createStore } from 'redux';

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
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
        default:
            return state;
    }
};

const store = createStore(reducer);

const deposit = (amount) => ({
    type: 'account/deposit',
    payload: amount,
});
const withdraw = (amount) => ({
    type: 'account/withdraw',
    payload: amount,
});
const requestLoan = (amount, purpose) => ({
    type: 'account/requestLoan',
    payload: { amount, purpose },
});
const payLoan = () => ({
    type: 'account/payLoan',
});

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

import { configureStore } from '@reduxjs/toolkit';
import { reducer as accountReducer } from './features/accounts/accountSlice';
import { reducer as customerReducer } from './features/customers/customerSlice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;

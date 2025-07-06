import { combineReducers, createStore } from 'redux';
import { reducer as accountReducer } from './features/accounts/accountSlice';
import { reducer as customerReducer } from './features/customers/customerSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

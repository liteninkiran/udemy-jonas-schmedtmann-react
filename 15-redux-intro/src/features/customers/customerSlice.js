const initialState = {
    fullName: '',
    nationalId: '',
    createdAt: '',
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'customer/createCustomer':
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalId: action.payload.nationalId,
                createdAt: action.payload.createdAt,
            };
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload,
            };
        default:
            return state;
    }
};

export const createCustomer = (fullName, nationalId) => ({
    type: 'customer/createCustomer',
    payload: {
        fullName,
        nationalId,
        createdAt: new Date().toISOString(),
    },
});

export const updateName = (fullName) => ({
    type: 'customer/updateName',
    payload: fullName,
});

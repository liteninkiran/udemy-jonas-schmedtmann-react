import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

const URL = 'user/fetchAddress';
const ADDRESS_ERROR =
    'There was a problem getting your address. Make sure to fill in this field.';

const initialState = {
    username: 'Jonas',
    status: 'idle',
    position: {},
    address: '',
    error: '',
};

const getPosition = () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const asyncFn = async () => {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the
    //    user's address, so we can display it the order form, so that the
    //    user can correct it if wrong
    const addr = await getAddress(position);
    const address = `${addr?.locality}, ${addr?.city} ${addr?.postcode}, ${addr?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateName(state, action) {
            state.username = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchAddress.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAddress.fulfilled, (state, action) => {
                state.position = action.payload.position;
                state.address = action.payload.address;
                state.status = 'idle';
            })
            .addCase(fetchAddress.rejected, (state, action) => {
                state.status = 'error';
                state.error = ADDRESS_ERROR;
            }),
});

export const fetchAddress = createAsyncThunk(URL, asyncFn);

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

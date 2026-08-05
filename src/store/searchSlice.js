import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: '',
        location: '',
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.term = action.payload;
        },
        setSearchLocation: (state, action) => {
            state.location = action.payload;
        },
        clearSearch: (state) => {
            state.term = '';
            state.location = '';
        },
    },
})

export const {
    setSearchTerm,
    setSearchLocation,
    clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;

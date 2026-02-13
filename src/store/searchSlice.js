import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        term: '',
        location: '',
        searchHistory: [], //optionl : for future "recent searches" feature
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
        addToSearchHistory: (state, action) => {
            const { term, location } = action.payload;
            const searchEntry = { term, location, timestamp: Date.now() }
            // Avoid adding duplicate entries to search history
            const exists = state.searchHistory.some(
                (entry) => entry.term === term && entry.location === location
            )
            if (!exists) {
                state.searchHistory.unshift(searchEntry); // Add new search to the beginning of the history array
                // Optional: Limit history to last 10 entries
                if (state.searchHistory.length > 10) {
                    state.searchHistory.pop();
                }
            }
        },
    },
})

export const {
    setSearchTerm,
    setSearchLocation,
    clearSearch,
    addToSearchHistory,
} = searchSlice.actions;

export default searchSlice.reducer;
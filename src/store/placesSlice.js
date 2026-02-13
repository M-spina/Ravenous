import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { searchPlaces } from "../utilities/placesService";
import { transformPlacesResponse } from "../utilities/API_Utilities";

// Async thunk to handle searching for places(replaces the search function in usePlaces)
export const fetchPlaces = createAsyncThunk(
    'search/fetchPlaces',
    async ({ term, location, coords }, { rejectWithValue }) => {
        try {
            console.log('Fetching places with parameters ✅', { term, location, coords });
            const places = await searchPlaces(term, location, coords);
            const transformedBusinesses = transformPlacesResponse(places);
            console.log('Transformed businesses ✅', transformedBusinesses);
            return transformedBusinesses;
        } catch (error) {
            console.error('Error fetching places: ❌', error);
            return rejectWithValue('An error occurred while searching for businesses. Please try again.');
        }
    }
);

const placesSlice = createSlice({
    name : 'places',
    initialState: {
        businesses: [],
        isLoading: false,
        error: null,
        sortBy: 'bestMatch', // Default sort option
        coords: null, // Store user coordinates in the slice to make them accessible for location biasing in searches
    },
    reducers: {
        setCoords: (state, action) => {
            state.coords = action.payload;
            console.log('User coordinates set in state ✅', state.coords);
        },
        clearCoords: (state) => {
            state.coords = null;
            console.log('User coordinates cleared from state ✅');
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
            console.log(`Sort option changed to: ${state.sortBy} ✅`);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                console.log('Fetch places pending... ✅');
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businesses = action.payload;
                state.sortBy = 'bestMatch'; // Reset sort to default when new search results come in
                console.log('Fetch places fulfilled ✅', state.businesses);
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while searching for businesses. Please try again.';
                state.businesses = [];
                console.error('Fetch places rejected ❌', state.error);
            });
    },

});

export const { setCoords, clearCoords, setSortBy } = placesSlice.actions;

// Input selectors (extract raw data from state)
const selectBusinesses = (state) => state.places.businesses;
const selectSortBy = (state) => state.places.sortBy;

// Memoized selector to get sorted businesses based on current sort option
export const selectSortedBusinesses = createSelector(
    [selectBusinesses, selectSortBy],
    (businesses, sortBy) => {
        const sorted = [...businesses]; // Create a copy to avoid mutating state directly

        switch (sortBy) {
            case 'rating':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Handle missing ratings by treating them as 0
            case 'reviewCount':
                return sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); // Handle missing review counts by treating them as 0
            case 'bestMatch':
            default:
                return sorted; // Assuming the original order is the best match order
        }
    }
)

export default placesSlice.reducer;
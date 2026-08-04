import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { searchPlaces } from "../utilities/placesService";
import { transformPlacesResponse } from "../utilities/API_Utilities";
import { loadGoogleMapsScript } from "../utilities/loadGoogleMaps";


export const initializeGoogleMaps = createAsyncThunk(
    'places/initializeGoogleMaps',
    async (_, { rejectWithValue }) => {
        try {
            await loadGoogleMapsScript(); // This now loads AND stores the library
            return true; // Return a success value if needed
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Google Maps initialization failed.');
            }
            return rejectWithValue(error.message || 'Failed to load Google Maps. Please try again later.');
        }
    }
);

// Async thunk to handle searching for places(replaces the search function in usePlaces)
export const fetchPlaces = createAsyncThunk(
    'search/fetchPlaces',
    async ({ term, location, coords }, { rejectWithValue }) => {
        try {
            const places = await searchPlaces(term, location, coords);
            const transformedBusinesses = transformPlacesResponse(places);
            return transformedBusinesses;
        } catch {
            if (import.meta.env.DEV) {
                console.error('Place search failed.');
            }
            return rejectWithValue('An error occurred while searching for businesses. Please try again.');
        }
    }
);

const placesSlice = createSlice({
    name : 'places',
    initialState: {
        businesses: [],
        isLoading: false,
        hasSearched: false,
        error: null,
        sortBy: 'bestMatch', // Default sort option
        coords: null, // Store user coordinates in the slice to make them accessible for location biasing in searches
        mapsLoaded: false, // Track whether Google Maps has finished loading
        mapsError: null // Store any errors related to loading Google Maps
    },
    reducers: {
        setCoords: (state, action) => {
            state.coords = action.payload;
        },
        clearCoords: (state) => {
            state.coords = null;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaces.pending, (state) => {
                state.isLoading = true;
                state.hasSearched = true;
                state.error = null;
            })
            .addCase(fetchPlaces.fulfilled, (state, action) => {
                state.isLoading = false;
                state.businesses = action.payload;
                state.sortBy = 'bestMatch'; // Reset sort to default when new search results come in
            })
            .addCase(fetchPlaces.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An error occurred while searching for businesses. Please try again.';
                state.businesses = [];
            })
            // Handle Google Maps initialization
            .addCase(initializeGoogleMaps.pending, (state) => {
                state.mapsLoaded = false;
                state.mapsError = null;
            })
            .addCase(initializeGoogleMaps.fulfilled, (state) => {
                state.mapsLoaded = true;
            })
            .addCase(initializeGoogleMaps.rejected, (state, action) => {
                state.mapsLoaded = false;
                state.mapsError = action.payload || 'Failed to load Google Maps. Please try again later.';
            })
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

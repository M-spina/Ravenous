import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./placesSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
    reducer: {
        places: placesReducer,
        search: searchReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development only
});
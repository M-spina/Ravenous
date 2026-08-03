import { useState, useEffect, useRef } from "react";
import { getPlacesLibrary } from "../utilities/loadGoogleMaps";

export const useAutocomplete = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // store the session token in a ref so it persists across renders without causing re-renders
    const sessionTokenRef = useRef(null);
    const requestIdRef = useRef(0);

    // Invalidate in-flight requests when the hook unmounts so they cannot update stale state
    useEffect(() => () => {
        requestIdRef.current += 1;
    }, []);

    const getSessionToken =  () => {
        if(!sessionTokenRef.current) {
            const {AutocompleteSessionToken} = getPlacesLibrary();
            sessionTokenRef.current = new AutocompleteSessionToken();
        }
        return sessionTokenRef.current;
    };

    const clearSuggestions = () => {
        requestIdRef.current += 1;
        setSuggestions([]);
        setIsLoading(false);
    };

    // Call this function to reset the session token when a new search is initiated
    const resetSession = () => {
        sessionTokenRef.current = null;
        clearSuggestions();
    };

    // Function to fetch autocomplete suggestions based on user input
    const fetchSuggestions = async (input) => {
        // Don't fetch suggestions for empty input or very short input
        if(!input || input.length < 2) {
            clearSuggestions();
            return;
        }

        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;
        setIsLoading(true);
        try {
            const { AutocompleteSuggestion } = getPlacesLibrary();
            const request = {
                input: input,
                sessionToken: getSessionToken(),
            }

            const { suggestions: results } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

            //Transform the results into a simpler format for our app
            const formattedSuggestions = results.map((suggestion) => ({
                placeId: suggestion.placePrediction.placeId,
                text: suggestion.placePrediction.text.text,
                mainText: suggestion.placePrediction.mainText.text,
                secondaryText: suggestion.placePrediction.secondaryText?.text || '',
            }));

            if(requestId === requestIdRef.current) {
                setSuggestions(formattedSuggestions);
                console.log('Autocomplete suggestions fetched ✅', formattedSuggestions);
            }
        }
        catch (error) {
            if(requestId === requestIdRef.current) {
                console.error("Error fetching autocomplete suggestions ❌:", error);
                setSuggestions([]);
            }
        }
        finally {
            if(requestId === requestIdRef.current) {
                setIsLoading(false);
            }
        }
    }

    return {
        suggestions,
        isLoading,
        fetchSuggestions,
        clearSuggestions,
        resetSession,
    };
};

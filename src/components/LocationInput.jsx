import {useEffect, useState, useRef} from 'react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { Input } from './ui/input';
import { LoaderCircle, MapPin } from 'lucide-react';
import GoogleMapsAttribution from './GoogleMapsAttribution';

export default function LocationInput({ value, onChange }) {

    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { suggestions, isLoading, fetchSuggestions, clearSuggestions, resetSession } = useAutocomplete();
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Clear a pending debounce timer when the input unmounts
    useEffect(() => () => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);

    // Handle input changes with debouncing
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(newValue);
        setActiveIndex(-1);
        // Clear any existing debounce timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }

        if(newValue.length < 2) {
            clearSuggestions();
            setShowDropdown(false);
            return;
        }

        // Debounce the fetchSuggestions call by 300ms
        debounceTimeoutRef.current = setTimeout(() => {
            debounceTimeoutRef.current = null;
            fetchSuggestions(newValue);
            setShowDropdown(true);
        }, 300);
    };

    //Handle selection of a suggestion
    const handleSelect = (suggestion) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }
        onChange(suggestion.text); // pass selected value to parent (searchBar)
        setShowDropdown(false);
        setActiveIndex(-1);
        resetSession(); // Reset autocomplete session after selection
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if(!showDropdown || suggestions.length === 0) return;
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex((prev) => prev < suggestions.length - 1 ? prev + 1 : 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex((prev) => prev > 0 ? prev - 1 : suggestions.length - 1);
                break;
            case 'Enter':
                if (activeIndex >= 0 && activeIndex < suggestions.length) {
                    e.preventDefault();
                    handleSelect(suggestions[activeIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setActiveIndex(-1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="relative min-w-0 flex-1" ref={dropdownRef}>
            <MapPin aria-hidden="true" className="pointer-events-none absolute left-3.5 top-6 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                ref={inputRef}
                id="location-search"
                type="text"
                placeholder='Where?'
                value={value || ''}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (suggestions.length > 0){
                        setShowDropdown(true)
                    }
                }}
                className="h-12 rounded-r-none border-r-0 pl-10"
                autoComplete='off'
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showDropdown}
                aria-controls="location-suggestions"
                aria-activedescendant={activeIndex >= 0 ? `location-suggestion-${activeIndex}` : undefined}
            />

            {showDropdown && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                <ul id="location-suggestions" role="listbox" className="max-h-64 list-none overflow-y-auto p-1.5">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.placeId}
                            id={`location-suggestion-${index}`}
                            role="option"
                            aria-selected={index === activeIndex}
                            className={`flex cursor-pointer flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left transition-colors ${index === activeIndex ? 'bg-muted' : 'hover:bg-muted/70'}`}
                            onClick={() => handleSelect(suggestion)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className="text-sm font-semibold text-foreground">{suggestion.mainText}</span>
                            {suggestion.secondaryText && (
                                <span className="text-xs text-muted-foreground">{suggestion.secondaryText}</span>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="border-t border-border"><GoogleMapsAttribution /></div>
                </div>
            )}

            {showDropdown && isLoading && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                        Searching locations...
                    </div>
                </div>
            )}
        </div>
    )


}

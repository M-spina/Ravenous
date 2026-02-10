import {useEffect, useState, useRef} from 'react';
import { useAutocomplete } from '../hooks/useAutocomplete';
import '../Styles/LocationInput.css';

export default function LocationInput({ value, onChange }) {

    const [inputValue, setInputValue] = useState(value || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { suggestions, isLoading,  fetchSuggestions, resetSession } = useAutocomplete();
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    // sync with parent value changes
    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

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

    // Handle input changes with debouncing
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setActiveIndex(-1);
        // Clear any existing debounce timeout
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Debounce the fetchSuggestions call by 300ms
        debounceTimeoutRef.current = setTimeout(() => {
            if(newValue.length >= 2) {
                fetchSuggestions(newValue);
                setShowDropdown(true);
            } else {
                setShowDropdown(false);
            }
        }, 300);
    };

    //Handle selection of a suggestion
    const handleSelect = (suggestion) => {
        setInputValue(suggestion.text);
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
        <div className="location-input-container" ref={dropdownRef}>
            <input
                ref={inputRef}
                type="text"
                placeholder='Where?'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (suggestions.length > 0){
                        setShowDropdown(true)
                    }
                }}
                className='location-input'
                autoComplete='off'
            />

            {showDropdown && suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.placeId}
                            className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => handleSelect(suggestion)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <span className="suggestion-main">{suggestion.mainText}</span>
                            {suggestion.secondaryText && (
                                <span className="suggestion-secondary">{suggestion.secondaryText}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {showDropdown && isLoading && (
                <div className="suggestions-dropdown">
                    <div className="suggestion-loading">Searching locations...</div>
                </div>
            )}
        </div>
    )


}
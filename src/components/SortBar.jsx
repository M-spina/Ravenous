import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '../store/placesSlice';
import '../Styles/SortBar.css';

export default function SortBar() {
    const dispatch = useDispatch();
    //get current sort option from Redux store to highlight active sort button
    const currentSort = useSelector((state) => state.places.sortBy);

    const sortOptions = [
        {id : 'bestMatch', label: 'Best Match'},
        {id : 'rating', label: 'Rating'},
        {id : 'reviewCount', label: 'Review Count'},
    ];

    const handleSortChange = (sortId) => {
        dispatch(setSortBy(sortId));
    }


    return (
        <div className="sort-bar">
            <span className="sort-label">Sort by:</span>
            <div className='sort-buttons'>
                {sortOptions.map((option) => (
                    <button
                        key={option.id}
                        className={`sort-button ${currentSort === option.id ? 'active' : ''}`}
                        onClick={() => handleSortChange(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
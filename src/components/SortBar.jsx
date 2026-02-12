import '../Styles/SortBar.css';

export default function SortBar({ currentSort, onSortChange }) {
    const sortOptions = [
        {id : 'bestMatch', label: 'Best Match'},
        {id : 'rating', label: 'Rating'},
        {id : 'reviewCount', label: 'Review Count'},
    ];


    return (
        <div className="sort-bar">
            <span className="sort-label">Sort by:</span>
            <div className='sort-buttons'>
                {sortOptions.map((option) => (
                    <button
                        key={option.id}
                        className={`sort-button ${currentSort === option.id ? 'active' : ''}`}
                        onClick={() => onSortChange(option.id)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
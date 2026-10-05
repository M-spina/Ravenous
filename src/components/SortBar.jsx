import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '../store/placesSlice';
import { Button } from './ui/button';
import { ArrowDownUp } from 'lucide-react';

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
        <>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:px-4">
            <span className="flex items-center gap-2 text-sm font-bold text-foreground">
                <ArrowDownUp aria-hidden="true" className="size-4 text-primary" />
                Sort by
            </span>
            <div className="flex flex-wrap justify-center gap-2" aria-label="Sort restaurants">
                {sortOptions.map((option) => (
                    <Button
                        key={option.id}
                        type="button"
                        size="sm"
                        variant={currentSort === option.id ? 'default' : 'ghost'}
                        onClick={() => handleSortChange(option.id)}
                        aria-pressed={currentSort === option.id}
                        className="rounded-full px-4"
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </div>
        <details className="mt-3 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            <summary className="cursor-pointer font-semibold text-foreground">About these results</summary>
            <p className="mt-2">Google’s Best Match ranking combines relevance, distance and prominence. Ravenous’s Rating and Review Count options reorder only the returned restaurants; they do not request additional results.</p>
            <a className="mt-2 inline-block underline underline-offset-4" href="https://support.google.com/business/answer/7091" target="_blank" rel="noopener noreferrer">Learn how Google ranks local results</a>
        </details>
        </>
    )
}

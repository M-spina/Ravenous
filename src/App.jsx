import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './components/SearchBar'
import BusinessList from './components/BusinessList'
import SortBar from './components/SortBar'
import BusinessListSkeleton from './components/Skeletons/BusinessListSkeleton'
import { selectSortedBusinesses, initializeGoogleMaps } from './store/placesSlice'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import { SearchX, TriangleAlert, UtensilsCrossed } from 'lucide-react'

function App() {

  const dispatch = useDispatch();
  // Get state from the Redux store using selectors
  const businesses = useSelector(selectSortedBusinesses);
  const { isLoading, error, mapsError } = useSelector((state) => state.places);

  
  // Initialize Google Maps when the app mounts so it's ready to use for location-based search and displaying maps in business details
  useEffect(() => {
    dispatch(initializeGoogleMaps());
  }, [dispatch]);


  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <header className="relative isolate bg-gradient-to-br from-primary-dark via-primary to-accent px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle_at_15%_20%,var(--color-highlight)_0,transparent_28%),radial-gradient(circle_at_85%_15%,var(--color-card)_0,transparent_24%)]" />
        <div className="mx-auto mb-7 max-w-4xl text-center text-primary-foreground">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-lg sm:size-14">
              <UtensilsCrossed aria-hidden="true" className="size-6 sm:size-7" />
            </span>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Ravenous</h1>
          </div>
          <p className="text-sm font-medium text-primary-foreground/85 sm:text-base">
            Find a table worth talking about.
          </p>
        </div>
        <SearchBar />
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="space-y-4">
          {mapsError && (
            <Alert variant="destructive" className="mx-auto max-w-4xl shadow-sm">
              <TriangleAlert aria-hidden="true" className="absolute left-4 top-3.5 size-4" />
              <div className="pl-6">
                <AlertTitle>Google Maps could not load</AlertTitle>
                <AlertDescription>{mapsError}</AlertDescription>
              </div>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mx-auto max-w-4xl shadow-sm">
              <TriangleAlert aria-hidden="true" className="absolute left-4 top-3.5 size-4" />
              <AlertDescription className="pl-6">{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {isLoading && <BusinessListSkeleton count={6}/>}

        {!isLoading && businesses.length === 0 && !error && (
          <section className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm" aria-live="polite">
            <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-muted text-primary">
              <SearchX aria-hidden="true" className="size-7" />
            </span>
            <h2 className="text-xl font-bold text-foreground">Ready when you are</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Search for restaurants to get started!
            </p>
          </section>
        )}
        {!isLoading && businesses.length > 0 && (
          <>
            <SortBar />
            <BusinessList businesses={businesses} />
          </>
        )}
      </main>
    </div>
  )
}

export default App

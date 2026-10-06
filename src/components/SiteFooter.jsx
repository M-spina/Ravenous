export default function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-7xl border-t border-border px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <nav aria-label="Legal information" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="/privacy.html" className="underline underline-offset-4">Privacy notice</a>
        <a href="/terms.html" className="underline underline-offset-4">Terms of use</a>
      </nav>
    </footer>
  );
}

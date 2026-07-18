import { cn } from "@/lib/utils"

function Alert({ className, variant = "default", ...props }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(
        "relative w-full rounded-lg border px-4 py-3 text-sm",
        variant === "destructive"
          ? "border-destructive/30 bg-destructive/10 text-destructive"
          : "border-border bg-card text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }) {
  return <div data-slot="alert-title" className={cn("mb-1 font-semibold leading-none", className)} {...props} />
}

function AlertDescription({ className, ...props }) {
  return <div data-slot="alert-description" className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
}

export { Alert, AlertTitle, AlertDescription }

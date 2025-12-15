export default function Loading() {
  return (
    <div className="min-h-screen bg-kahu-cream-warm flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <p className="font-display text-display-sm text-kahu-charcoal animate-pulse">
          KAHU
        </p>

        {/* Loading indicator */}
        <div className="mt-6 flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-kahu-terracotta rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-kahu-terracotta rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-kahu-terracotta rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

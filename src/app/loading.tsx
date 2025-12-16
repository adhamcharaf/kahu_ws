import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen bg-kahu-cream-warm flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <Image
          src="/images/Logo.png"
          alt="KAHU"
          width={120}
          height={48}
          className="h-12 w-auto mx-auto animate-pulse"
          priority
        />

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

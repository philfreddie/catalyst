"use client"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-r-white/40 animate-spin animation-delay-150"></div>
      </div>
    </div>
  )
}

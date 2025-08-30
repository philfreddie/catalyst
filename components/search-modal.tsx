"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { App, Category } from "@/lib/types"
import Image from "next/image"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  apps: App[]
  categories: Category[]
}

export default function SearchModal({ isOpen, onClose, apps, categories }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [filteredApps, setFilteredApps] = useState<App[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setFilteredApps([])
      return
    }

    const filtered = apps.filter((app) => {
      const searchTerm = query.toLowerCase()
      return (
        app.name.toLowerCase().includes(searchTerm) ||
        app.description.toLowerCase().includes(searchTerm) ||
        app.overview.toLowerCase().includes(searchTerm) ||
        categories
          .find((cat) => cat.id === app.category)
          ?.name.toLowerCase()
          .includes(searchTerm)
      )
    })

    setFilteredApps(filtered.slice(0, 8)) // Limit to 8 results
    setSelectedIndex(0)
  }, [query, apps, categories])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, filteredApps.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && filteredApps[selectedIndex]) {
      handleAppSelect(filteredApps[selectedIndex].id)
    }
  }

  const handleAppSelect = (appId: string) => {
    router.push(`/app/${appId}`)
    onClose()
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || ""
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <Card className="relative w-full max-w-2xl bg-black/80 backdrop-blur-xl border-white/20">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools and software..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
          />
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 p-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim() && filteredApps.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-white/60 mb-2">No results found</div>
              <div className="text-white/40 text-sm">Try searching for something else</div>
            </div>
          )}

          {filteredApps.map((app, index) => (
            <div
              key={app.id}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                index === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
              }`}
              onClick={() => handleAppSelect(app.id)}
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Image
                  src={app.icon || "/placeholder.svg"}
                  alt={`${app.name} icon`}
                  width={24}
                  height={24}
                  className="rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.nextElementSibling?.classList.remove("hidden")
                  }}
                />
                <div className="hidden w-6 h-6 bg-white/20 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{app.name.charAt(0)}</span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium truncate">{app.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs flex-shrink-0">
                    {getCategoryName(app.category)}
                  </span>
                </div>
                <p className="text-white/70 text-sm line-clamp-1">{app.description}</p>
              </div>

              <svg
                className="w-4 h-4 text-white/40 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Footer */}
        {query.trim() && filteredApps.length > 0 && (
          <div className="flex items-center justify-between p-3 border-t border-white/10 text-xs text-white/60">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↓</kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↵</kbd>
                <span>select</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">esc</kbd>
              <span>close</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

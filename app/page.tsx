"use client"

import { useState, useEffect } from "react"
import CategoryGrid from "@/components/category-grid"
import AppGrid from "@/components/app-grid"
import ShaderBackground from "@/components/shader-background"
import LoadingSpinner from "@/components/loading-spinner"
import type { Category, App } from "@/lib/types"

export default function CatalystDirectory() {
  const [categories, setCategories] = useState<Category[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredApps, setFilteredApps] = useState<App[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/apps")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setCategories(data.categories)
        setApps(data.apps)
      } catch (error) {
        console.error("Failed to load apps data:", error)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get("category")
    if (categoryParam && categories.some((cat) => cat.id === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [categories])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        const searchButton = document.querySelector("[data-search-trigger]") as HTMLButtonElement
        if (searchButton) {
          searchButton.click()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      setFilteredApps(apps.filter((app) => app.category === selectedCategory))
    }
  }, [selectedCategory, apps])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const url = new URL(window.location.href)
    url.searchParams.set("category", categoryId)
    window.history.pushState({}, "", url.toString())
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    const url = new URL(window.location.href)
    url.searchParams.delete("category")
    window.history.pushState({}, "", url.toString())
  }

  const selectedCategoryData = categories.find((cat) => cat.id === selectedCategory)

  if (loading) {
    return (
      <ShaderBackground>
        <header className="relative z-20 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-xl font-medium tracking-tight">catalyst</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <button className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200">
              Categories
            </button>
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Submit Tool
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              About
            </a>
          </nav>
          <div className="flex items-center">
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-normal text-xs h-8 flex items-center gap-2 opacity-50">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
              <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/20 text-white/80 text-xs flex items-center gap-1">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </div>
          </div>
        </header>
        <LoadingSpinner />
      </ShaderBackground>
    )
  }

  if (error) {
    return (
      <ShaderBackground>
        <header className="relative z-20 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-xl font-medium tracking-tight">catalyst</h1>
          </div>
          <nav className="flex items-center space-x-2">
            <button className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200">
              Categories
            </button>
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Submit Tool
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              About
            </a>
          </nav>
          <div className="flex items-center">
            <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-normal text-xs h-8 flex items-center gap-2 opacity-50">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search
              <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/20 text-white/80 text-xs flex items-center gap-1">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-white text-lg mb-2">Oops! Something went wrong</div>
            <div className="text-white/70 text-sm mb-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-full bg-white text-black hover:bg-white/90 text-sm font-normal transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </ShaderBackground>
    )
  }

  return (
    <ShaderBackground>
      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <h1 className="text-white text-xl font-medium tracking-tight">catalyst</h1>
        </div>
        <nav className="flex items-center space-x-2">
          <button className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200">
            Categories
          </button>
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Submit Tool
          </a>
          <a
            href="#"
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            About
          </a>
        </nav>
        <div className="flex items-center">
          <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-normal text-xs h-8 flex items-center gap-2 opacity-50">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
            <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/20 text-white/80 text-xs flex items-center gap-1">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
        </div>
      </header>
      <main className="relative z-20 p-6 pt-0">
        <div className="max-w-7xl mx-auto">
          {!selectedCategory ? (
            <>
              {/* Hero Section */}
              <div className="text-center mb-16 pt-12">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-6 hover:bg-white/10 transition-colors">
                  <span className="text-white/90 text-xs font-light">✨ Curated Tools & Software</span>
                </div>

                <h1 className="text-5xl md:text-6xl tracking-tight font-light text-white mb-6 animate-fade-in">
                  <span className="font-medium italic instrument">Curated</span> Tools
                  <br />
                  <span className="font-light tracking-tight text-white">Discovery</span>
                </h1>

                <p className="text-sm font-light text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in animation-delay-200">
                  Your hub for discovering the best websites and software. Hand-picked tools organized into simple
                  categories, so you find exactly what you need in seconds.
                </p>
              </div>

              {/* Categories */}
              <div className="animate-fade-in animation-delay-400">
                <CategoryGrid categories={categories} apps={apps} onCategorySelect={handleCategorySelect} />
              </div>
            </>
          ) : (
            <>
              {/* Category Header */}
              <div className="mb-8 pt-8 animate-fade-in">
                <h2 className="text-3xl font-light text-white mb-2">{selectedCategoryData?.name}</h2>
                <p className="text-white/70 text-sm">{selectedCategoryData?.description}</p>
              </div>

              <div className="animate-fade-in animation-delay-200">
                <AppGrid apps={filteredApps} />
              </div>
            </>
          )}
        </div>
      </main>
    </ShaderBackground>
  )
}

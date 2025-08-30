"use client"

import { useState } from "react"
import SearchModal from "./search-modal"
import type { App, Category } from "@/lib/types"

interface DirectoryHeaderProps {
  selectedCategory?: string
  onBackToCategories: () => void
  categoryName?: string
  apps?: App[]
  categories?: Category[]
}

export default function DirectoryHeader({
  selectedCategory,
  onBackToCategories,
  categoryName,
  apps = [],
  categories = [],
}: DirectoryHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="relative z-20 flex items-center justify-between p-6">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <h1 className="text-white text-xl font-medium tracking-tight">catalyst</h1>
          {selectedCategory && (
            <>
              <span className="text-white/40">/</span>
              <button
                onClick={onBackToCategories}
                className="text-white/80 hover:text-white text-sm font-light transition-colors"
              >
                {categoryName}
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-2">
          <button
            onClick={onBackToCategories}
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
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

        {/* Search Button */}
        <div className="flex items-center">
          <button
            data-search-trigger
            onClick={handleSearchClick}
            className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white font-normal text-xs transition-all duration-300 hover:bg-white/20 cursor-pointer h-8 flex items-center gap-2"
          >
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
          </button>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} apps={apps} categories={categories} />
    </>
  )
}

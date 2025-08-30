"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchModal from "./search-modal"
import type { App, Category } from "@/lib/types"

interface DirectoryHeaderProps {
  selectedCategory?: string
  onBackToCategories?: () => void
  categoryName?: string
  apps?: App[]
  categories?: Category[]
  showBreadcrumb?: boolean
}

export default function DirectoryHeader({
  selectedCategory,
  onBackToCategories,
  categoryName,
  apps = [],
  categories = [],
  showBreadcrumb = true,
}: DirectoryHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
  }

  const handleCategoriesClick = () => {
    if (onBackToCategories) {
      onBackToCategories()
    } else {
      router.push("/")
    }
  }

  const handleLogoClick = () => {
    window.location.assign("/")
  }

  const handleSubmitToolClick = () => {
    router.push("/submit-tool")
  }

  const handleAboutClick = () => {
    router.push("/about")
  }

  return (
    <>
      <header className="relative z-20 flex items-center justify-between p-6 w-full">
        {/* Logo and Breadcrumb */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={handleLogoClick}
            className="text-white text-xl font-medium tracking-tight hover:text-white/80 transition-colors"
          >
            catalyst
          </button>
          {showBreadcrumb && selectedCategory && (
            <>
              <span className="text-white/40">/</span>
              <button
                onClick={handleCategoriesClick}
                className="text-white/80 hover:text-white text-sm font-light transition-colors"
              >
                {categoryName}
              </button>
            </>
          )}
        </div>

        <nav className="flex items-center space-x-2 flex-1 justify-center">
          <button
            onClick={handleCategoriesClick}
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Categories
          </button>
          <button
            onClick={handleSubmitToolClick}
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            Submit Tool
          </button>
          <button
            onClick={handleAboutClick}
            className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            About
          </button>
        </nav>

        {/* Search Button */}
        <div className="flex items-center flex-1 justify-end">
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

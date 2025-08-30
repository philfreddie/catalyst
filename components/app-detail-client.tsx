"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ShaderBackground from "@/components/shader-background"
import Breadcrumb from "@/components/breadcrumb"
import SearchModal from "@/components/search-modal"
import type { App, Category } from "@/lib/types"

interface AppDetailClientProps {
  app: App
  category?: Category
  allApps?: App[]
  allCategories?: Category[]
}

export default function AppDetailClient({ app, category, allApps = [], allCategories = [] }: AppDetailClientProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)
  const [isVisiting, setIsVisiting] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleVisitApp = async () => {
    setIsVisiting(true)
    setTimeout(() => {
      window.open(app.url, "_blank", "noopener,noreferrer")
      setIsVisiting(false)
    }, 300)
  }

  const breadcrumbItems = [
    { label: "Home", onClick: () => router.push("/") },
    ...(category ? [{ label: category.name, onClick: () => router.push(`/?category=${category.id}`) }] : []),
    { label: app.name },
  ]

  return (
    <ShaderBackground>
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="text-white/80 hover:text-white transition-all duration-200 p-2 -ml-2 rounded-full hover:bg-white/10 group"
            aria-label="Go back"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white text-xl font-medium tracking-tight">catalyst</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
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

          <Button
            onClick={handleVisitApp}
            disabled={isVisiting}
            className="bg-white text-black hover:bg-white/90 text-xs font-normal px-6 py-2 h-8 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            {isVisiting ? "Opening..." : "Visit App"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 p-6 pt-0">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          {/* App Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group hover:bg-white/15 transition-colors">
              {!imageError ? (
                <Image
                  src={app.icon || "/placeholder.svg"}
                  alt={`${app.name} icon`}
                  width={64}
                  height={64}
                  className="rounded-xl group-hover:scale-105 transition-transform"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-medium">{app.name.charAt(0)}</span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-light text-white">{app.name}</h1>
                {category && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-light hover:bg-white/15 transition-colors">
                    {category.name}
                  </span>
                )}
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-4">{app.description}</p>
              <Button
                onClick={handleVisitApp}
                disabled={isVisiting}
                className="bg-white text-black hover:bg-white/90 text-sm font-normal px-8 py-3 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                {isVisiting ? "Opening..." : `Visit ${app.name}`}
              </Button>
            </div>
          </div>

          {/* Overview */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 mb-8 hover:bg-white/[0.07] transition-colors">
            <h2 className="text-white text-xl font-medium mb-4">Overview</h2>
            <p className="text-white/80 leading-relaxed">{app.overview}</p>
          </Card>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pros */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white font-medium">Pros</h3>
              </div>
              <ul className="space-y-3">
                {app.pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <svg
                      className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/80 text-sm leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Cons */}
            <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/[0.07] transition-colors">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-white font-medium">Cons</h3>
              </div>
              <ul className="space-y-3">
                {app.cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <svg
                      className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-white/80 text-sm leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Screenshots */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 mb-8 hover:bg-white/[0.07] transition-colors">
            <h2 className="text-white text-xl font-medium mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="aspect-video bg-white/10 rounded-lg flex items-center justify-center group hover:bg-white/15 transition-colors"
                >
                  <Image
                    src={`/abstract-geometric-shapes.png?key=jnse7&height=200&width=300&query=${app.name} screenshot ${index}`}
                    alt={`${app.name} screenshot ${index}`}
                    width={300}
                    height={200}
                    className="rounded-lg group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Bottom CTA */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 text-center hover:bg-white/[0.07] transition-colors">
            <h3 className="text-white text-xl font-medium mb-2">Ready to try {app.name}?</h3>
            <p className="text-white/70 mb-6">Visit their website to get started</p>
            <Button
              onClick={handleVisitApp}
              disabled={isVisiting}
              className="bg-white text-black hover:bg-white/90 text-sm font-normal px-8 py-3 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              {isVisiting ? "Opening..." : `Visit ${app.name}`}
            </Button>
          </Card>
        </div>
      </main>

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        apps={allApps}
        categories={allCategories}
      />
    </ShaderBackground>
  )
}

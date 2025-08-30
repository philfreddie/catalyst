"use client"

import { Card } from "@/components/ui/card"
import type { Category, App } from "@/lib/types"

interface CategoryGridProps {
  categories: Category[]
  apps: App[]
  onCategorySelect: (categoryId: string) => void
}

export default function CategoryGrid({ categories, apps, onCategorySelect }: CategoryGridProps) {
  const getAppCountForCategory = (categoryId: string) => {
    return apps.filter((app) => app.category === categoryId).length
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => (
        <Card
          key={category.id}
          className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          onClick={() => onCategorySelect(category.id)}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium text-lg">{category.name}</h3>
            <span className="text-white/60 text-sm">{getAppCountForCategory(category.id)} tools</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{category.description}</p>
          <div className="mt-4 flex items-center text-white/60 group-hover:text-white/80 transition-colors">
            <span className="text-xs">Explore</span>
            <svg
              className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Card>
      ))}
    </div>
  )
}

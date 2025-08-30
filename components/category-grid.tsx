"use client"

import { Card } from "@/components/ui/card"
import type { Category, App } from "@/lib/types"
import Image from "next/image"

interface CategoryGridProps {
  categories: Category[]
  apps: App[]
  onCategorySelect: (categoryId: string) => void
}

export default function CategoryGrid({ categories, apps, onCategorySelect }: CategoryGridProps) {
  const getAppsForCategory = (categoryId: string) => {
    return apps.filter((app) => app.category === categoryId).slice(0, 3)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {categories.map((category) => {
        const categoryApps = getAppsForCategory(category.id)

        return (
          <Card
            key={category.id}
            className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-medium text-lg">{category.name}</h3>
              <span className="text-white/60 text-sm">
                {apps.filter((app) => app.category === category.id).length} tools
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{category.description}</p>

            {categoryApps.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {categoryApps.map((app) => (
                    <div key={app.id} className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={app.icon || "/placeholder.svg"}
                          alt={`${app.name} icon`}
                          width={12}
                          height={12}
                          className="rounded-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                            target.nextElementSibling?.classList.remove("hidden")
                          }}
                        />
                        <div className="hidden w-3 h-3 bg-white/20 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-medium">{app.name.charAt(0)}</span>
                        </div>
                      </div>
                      <span className="text-white/60 text-xs truncate">{app.name}</span>
                    </div>
                  ))}
                  {apps.filter((app) => app.category === category.id).length > 3 && (
                    <span className="text-white/40 text-xs">
                      +{apps.filter((app) => app.category === category.id).length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

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
        )
      })}
    </div>
  )
}

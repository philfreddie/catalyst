"use client"

import { Card } from "@/components/ui/card"
import type { App } from "@/lib/types"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface AppGridProps {
  apps: App[]
}

export default function AppGrid({ apps }: AppGridProps) {
  const router = useRouter()

  const handleAppSelect = (appId: string) => {
    router.push(`/app/${appId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <Card
          key={app.id}
          className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group h-[280px] flex flex-col"
          onClick={() => handleAppSelect(app.id)}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Image
                src={app.icon || "/placeholder.svg"}
                alt={`${app.name} icon`}
                width={32}
                height={32}
                className="rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.nextElementSibling?.classList.remove("hidden")
                }}
              />
              <div className="hidden w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">{app.name.charAt(0)}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-lg mb-1 truncate">{app.name}</h3>
              <p className="text-white/70 text-sm leading-relaxed line-clamp-3">{app.description}</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1">
              <h4 className="text-white/80 text-xs font-medium mb-2">Pros</h4>
              <ul className="space-y-1">
                {app.pros.slice(0, 2).map((pro, index) => (
                  <li key={index} className="text-white/60 text-xs flex items-start gap-2">
                    <svg
                      className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="line-clamp-2">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
              <span className="text-white/60 text-xs">View details</span>
              <svg
                className="w-3 h-3 text-white/60 group-hover:text-white/80 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface App {
  id: string
  name: string
  category: string
  icon: string
  url: string
  description: string
  overview: string
  pros: string[]
  cons: string[]
  screenshots?: string[]
}

export interface AppsData {
  categories: Category[]
  apps: App[]
}

import { promises as fs } from "fs"
import path from "path"
import yaml from "js-yaml"
import type { AppsData } from "./types"

let cachedData: AppsData | null = null

export async function getAppsData(): Promise<AppsData> {
  if (cachedData) {
    return cachedData
  }

  try {
    const filePath = path.join(process.cwd(), "data", "apps.yaml")
    const fileContents = await fs.readFile(filePath, "utf8")
    const data = yaml.load(fileContents) as AppsData

    cachedData = data
    return data
  } catch (error) {
    console.error("Error loading apps data:", error)
    return { categories: [], apps: [] }
  }
}

export async function getAppsByCategory(categoryId: string) {
  const data = await getAppsData()
  return data.apps.filter((app) => app.category === categoryId)
}

export async function getAppById(id: string) {
  const data = await getAppsData()
  return data.apps.find((app) => app.id === id)
}

export async function getCategories() {
  const data = await getAppsData()
  return data.categories
}

export async function getApps() {
  const data = await getAppsData()
  return data.apps
}

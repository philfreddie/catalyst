import { notFound } from "next/navigation"
import { getAppById, getCategories, getApps } from "@/lib/data"
import AppDetailClient from "@/components/app-detail-client"

interface AppPageProps {
  params: {
    id: string
  }
}

export default async function AppPage({ params }: AppPageProps) {
  const app = await getAppById(params.id)
  const categories = await getCategories()
  const allApps = await getApps()

  if (!app) {
    notFound()
  }

  const category = categories.find((cat) => cat.id === app.category)

  return <AppDetailClient app={app} category={category} allApps={allApps} allCategories={categories} />
}

export async function generateStaticParams() {
  // This would generate static paths for all apps
  return []
}

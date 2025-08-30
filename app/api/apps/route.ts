import { NextResponse } from "next/server"
import { getAppsData } from "@/lib/data"

export async function GET() {
  try {
    const data = await getAppsData()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching apps data:", error)
    return NextResponse.json({ error: "Failed to fetch apps data" }, { status: 500 })
  }
}

"use client"

interface AboutClientProps {
  apps: any[]
  categories: any[]
}

export function AboutClient({ apps, categories }: AboutClientProps) {
  return (
    <div className="text-center mt-16">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
        <h3 className="text-2xl font-light text-white mb-4">Ready to Explore?</h3>
        <p className="text-white/70 text-sm mb-6 leading-relaxed">
          Start discovering amazing tools curated just for you. Browse by category or search for something
          specific.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.assign("/")}
            className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse Tools
          </button>
          <button
            onClick={() => window.location.assign("/submit-tool")}
            className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
          >
            Submit a Tool
          </button>
        </div>
      </div>
    </div>
  )
}

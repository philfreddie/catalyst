import { ShaderBackground } from "@/components/shader-background"
import DirectoryHeader from "@/components/directory-header"
import ProfileSheet from "@/components/profile-sheet"
import { getApps, getCategories } from "@/lib/data"

export default async function SubmitToolPage() {
  const apps = await getApps()
  const categories = await getCategories()

  return (
    <ShaderBackground>
      <DirectoryHeader apps={apps} categories={categories} showBreadcrumb={false} />

      <main className="relative z-20 p-6 pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 pt-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-6 hover:bg-white/10 transition-colors">
              <span className="text-white/90 text-xs font-light">📝 Contribute to Catalyst</span>
            </div>

            <h1 className="text-5xl md:text-6xl tracking-tight font-light text-white mb-6 animate-fade-in">
              <span className="font-medium italic instrument">Submit</span> a Tool
              <br />
              <span className="font-light tracking-tight text-white">Help Us Grow</span>
            </h1>

            <p className="text-sm font-light text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Found an amazing tool that deserves to be discovered? Share it with our community and help others find the
              perfect software for their needs.
            </p>
          </div>

          {/* Form Section */}
          <div className="animate-fade-in animation-delay-400 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Tool Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="Enter the tool name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Website URL</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Category</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all">
                    <option value="">Select a category</option>
                    <option value="productivity">Productivity</option>
                    <option value="design">Design</option>
                    <option value="developer-tools">Developer Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Description</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none"
                    placeholder="Brief description of what makes this tool special"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Why should we feature it?</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all resize-none"
                    placeholder="Tell us what makes this tool stand out from the competition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Submit Tool for Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ProfileSheet />
    </ShaderBackground>
  )
}

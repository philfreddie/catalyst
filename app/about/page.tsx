import { ShaderBackground } from "@/components/shader-background"
import DirectoryHeader from "@/components/directory-header"
import ProfileSheet from "@/components/profile-sheet"
import { AboutClient } from "@/components/about-client"
import { getApps, getCategories } from "@/lib/data"

export default async function AboutPage() {
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
              <span className="text-white/90 text-xs font-light">🚀 About Our Mission</span>
            </div>

            <h1 className="text-5xl md:text-6xl tracking-tight font-light text-white mb-6 animate-fade-in">
              <span className="font-medium italic instrument">About</span> Catalyst
              <br />
              <span className="font-light tracking-tight text-white">Our Story</span>
            </h1>

            <p className="text-sm font-light text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto animate-fade-in animation-delay-200">
              We believe discovering great software shouldn't be a chore. Catalyst curates the best tools and websites,
              saving you time and helping you find exactly what you need.
            </p>
          </div>

          {/* Content Grid */}
          <div className="animate-fade-in animation-delay-400">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">Our Mission</h2>
                </div>
                <p className="text-white/70 leading-relaxed text-sm">
                  Catalyst saves you time by putting the best tools in one place, with a clean and intuitive interface.
                  We curate high-quality websites and software so you don't have to sift through endless search results.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">How It Works</h2>
                </div>
                <p className="text-white/70 leading-relaxed text-sm">
                  Everything is organized into categories like Productivity, Design, and Developer Tools. Each listing
                  includes detailed overviews, pros and cons for quick evaluation, and screenshots to help you decide.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🔄</span>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">Simple Updates</h2>
                </div>
                <p className="text-white/70 leading-relaxed text-sm">
                  All listings are stored in a single YAML file, making updates effortless. Just edit one file and the
                  entire directory updates automatically, keeping everything fresh and current.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🤝</span>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">Get Involved</h2>
                </div>
                <p className="text-white/70 leading-relaxed text-sm">
                  Have a tool you love? Submit it to help others discover great software. We're always looking for
                  high-quality tools to add to our directory and grow our community.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <AboutClient apps={apps} categories={categories} />
          </div>
        </div>
      </main>

      <ProfileSheet />
    </ShaderBackground>
  )
}

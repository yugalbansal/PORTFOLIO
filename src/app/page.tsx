import ParticleBackground from "@/components/particle-effect-for-hero"
import LetsWorkTogether from "@/components/lets-work-section"
import ThemeToggle from "@/components/theme-toggle"
import { InteractiveHoverLinks } from "@/components/interactive-hover-links"

export default function Home() {
  return (
    <main className="relative">
      {/* Global page background + glow (behind everything, visible everywhere) */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-background">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(66,133,244,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <ThemeToggle />
        {/* Hero Section with Particles - 100vh */}
        <section className="relative h-screen w-full overflow-hidden">
          <ParticleBackground />
        </section>
        <InteractiveHoverLinks />
        <LetsWorkTogether />
      </div>
    </main>
  )
}

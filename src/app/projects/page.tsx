import ThemeToggle from "@/components/theme-toggle"
import { ProjectsSection } from "@/components/projects-section"

export default function ProjectsPage() {
  return (
    <main className="relative">
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
        <ProjectsSection />
      </div>
    </main>
  )
}

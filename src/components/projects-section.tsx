"use client"

import { motion } from "motion/react"
import { ProjectCard, type Project } from "@/components/project-card"

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Vector Mind",
    description:
      "Vector Mind is a multimodal AI study platform built on context-aware document retrieval. Users can upload documents once and chat with an intelligent assistant that searches across all content to provide grounded answers. When no relevant context exists, the system generates AI responses, and also supports voice interaction, image generation, and JSONL dataset export.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    techStack: [
      "React",
      "TypeScript",
      "Python",
      "LLM Inference",
      "PostgreSQL",
      "Clerk",
      "Tailwind CSS"
    ],
    githubUrl: "https://github.com/yugalbansal/AI-STUDY",
    liveUrl: "https://vectormind.site",
  },
  {
    id: "2",
    title: "Autofy",
    description:
      "Autofy is a no-code automation platform that allows users to connect multiple applications and create automated workflows using a simple visual interface. Inspired by tools like Zapier and n8n, it focuses on better user experience while supporting trigger-based automations across apps such as Gmail, Notion, Telegram, and Reddit to reduce repetitive manual tasks.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    techStack: [
      "React",
      "TypeScript",
      "Inference",
      "PostgreSQL",
      "Serverless (Edge Functions)",
      "Tailwind CSS"
    ],
    githubUrl: "https://github.com/yugalbansal/Autofy",
    liveUrl: "https://autofy-g1.netlify.app",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description:
      "This portfolio website serves as a personal platform to showcase projects, technical skills, and hands-on experience in a clear and structured manner. It highlights work across web development, backend systems, and AI-driven applications, while focusing on clean design, responsiveness, performance optimization, and easy navigation for recruiters and collaborators.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    githubUrl: "https://github.com/yugalbansal/PORTFOLIO",
    liveUrl: "https://yugalbansal.in",
  },
  {
    id: "4",
    title: "Meme-O-Magic",
    description:
      "Meme-O-Magic is a creative web application that enables users to generate custom memes using uploaded images or pre-built templates. It allows adding and positioning text freely, customizing fonts and colors, and previewing changes in real time, making meme creation fast, flexible, and accessible without requiring any design tools.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
    techStack: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/yugalbansal/meme-generator",
    liveUrl: "https://meme.yugal.site",
  },
  {
    id: "5",
    title: "Typing Boost",
    description:
      "Typing Boost is a productivity-focused web platform designed to help users improve typing speed, accuracy, and writing efficiency. It provides interactive typing tests along with word and character analysis tools, offering real-time feedback that helps users track performance, identify weaknesses, and practice consistently in a distraction-free environment.",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop",
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/yugalbansal/typingboost3",
    liveUrl: "https://typingboost3.vercel.app/",
  },
];



interface ProjectsSectionProps {
  projects?: Project[]
}

export function ProjectsSection({ projects = DEFAULT_PROJECTS }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="min-h-screen bg-background py-16 text-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            My Projects
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of my recent work and side projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

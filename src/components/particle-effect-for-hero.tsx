"use client"

import React, { useEffect, useRef, useCallback } from "react"

// ---- Types ----
interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  size: number
  color: string
}

interface BackgroundParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  phase: number
}

interface MouseState {
  x: number
  y: number
  isActive: boolean
}

// ---- Config ----
const PARTICLE_DENSITY = 0.00015
const BG_PARTICLE_DENSITY = 0.00005
const MOUSE_RADIUS = 180
const RETURN_SPEED = 0.08
const DAMPING = 0.9
const REPULSION_STRENGTH = 1.2

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const particlesRef = useRef<Particle[]>([])
  const bgParticlesRef = useRef<BackgroundParticle[]>([])
  const mouseRef = useRef<MouseState>({
    x: -1000,
    y: -1000,
    isActive: false,
  })

  const frameRef = useRef(0)
  const lastTimeRef = useRef(0)

  // ---- Init ----
  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.floor(w * h * PARTICLE_DENSITY)
    particlesRef.current = Array.from({ length: count }).map(() => {
      const x = Math.random() * w
      const y = Math.random() * h
      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1, 2.5),
        color: "#ffffff",
      }
    })

    const bgCount = Math.floor(w * h * BG_PARTICLE_DENSITY)
    bgParticlesRef.current = Array.from({ length: bgCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: randomRange(0.5, 1.5),
      alpha: randomRange(0.1, 0.4),
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  // ---- Animation ----
  const animate = useCallback((t: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    lastTimeRef.current = t
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // background glow
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.7)
    g.addColorStop(0, "rgba(66,133,244,0.08)")
    g.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // bg particles
    ctx.fillStyle = "#fff"
    bgParticlesRef.current.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = canvas.width
      if (p.y < 0) p.y = canvas.height
      if (p.x > canvas.width) p.x = 0
      if (p.y > canvas.height) p.y = 0

      ctx.globalAlpha = p.alpha
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1

    // main particles
    const mouse = mouseRef.current
    particlesRef.current.forEach(p => {
      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (mouse.isActive && dist < MOUSE_RADIUS) {
        p.vx -= (dx / dist) * REPULSION_STRENGTH
        p.vy -= (dy / dist) * REPULSION_STRENGTH
      }

      p.vx += (p.originX - p.x) * RETURN_SPEED
      p.vy += (p.originY - p.y) * RETURN_SPEED

      p.vx *= DAMPING
      p.vy *= DAMPING
      p.x += p.vx
      p.y += p.vy

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()
    })

    frameRef.current = requestAnimationFrame(animate)
  }, [])

  // ---- Resize ----
  useEffect(() => {
    const resize = () => {
      if (!containerRef.current || !canvasRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvasRef.current.width = width * dpr
      canvasRef.current.height = height * dpr
      canvasRef.current.style.width = `${width}px`
      canvasRef.current.style.height = `${height}px`
      canvasRef.current.getContext("2d")?.scale(dpr, dpr)
      initParticles(width, height)
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [initParticles])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [animate])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 bg-background"
      onMouseMove={e => {
        const r = containerRef.current!.getBoundingClientRect()
        mouseRef.current = {
          x: e.clientX - r.left,
          y: e.clientY - r.top,
          isActive: true,
        }
      }}
      onMouseLeave={() => (mouseRef.current.isActive = false)}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

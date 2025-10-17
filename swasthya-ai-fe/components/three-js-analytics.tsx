"use client"

import { useEffect, useRef } from "react"

export function ThreeJsAnalytics() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // @ts-ignore
    const THREE = window.THREE
    if (!THREE) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa)

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)

    // Create a network of connected spheres
    const spheres: THREE.Mesh[] = []
    const lines: THREE.Line[] = []
    const nodeCount = 8

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 2

      const geometry = new THREE.SphereGeometry(0.2, 32, 32)
      const material = new THREE.MeshPhongMaterial({
        color: 0x2563eb,
        emissive: 0x1e40af,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.x = Math.cos(angle) * radius
      sphere.position.y = Math.sin(angle) * radius
      sphere.position.z = Math.cos(angle * 2) * 0.5

      spheres.push(sphere)
      scene.add(sphere)
    }

    // Create connecting lines
    for (let i = 0; i < nodeCount; i++) {
      const nextI = (i + 1) % nodeCount
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array([
        spheres[i].position.x,
        spheres[i].position.y,
        spheres[i].position.z,
        spheres[nextI].position.x,
        spheres[nextI].position.y,
        spheres[nextI].position.z,
      ])
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

      const material = new THREE.LineBasicMaterial({ color: 0x16a34a, linewidth: 2 })
      const line = new THREE.Line(geometry, material)
      lines.push(line)
      scene.add(line)
    }

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(5, 5, 5)
    scene.add(light)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      spheres.forEach((sphere, index) => {
        const angle = (index / nodeCount) * Math.PI * 2 + Date.now() * 0.0005
        const radius = 2
        sphere.position.x = Math.cos(angle) * radius
        sphere.position.y = Math.sin(angle) * radius
        sphere.position.z = Math.cos(angle * 2) * 0.5
      })

      // Update line positions
      for (let i = 0; i < nodeCount; i++) {
        const nextI = (i + 1) % nodeCount
        const positions = new Float32Array([
          spheres[i].position.x,
          spheres[i].position.y,
          spheres[i].position.z,
          spheres[nextI].position.x,
          spheres[nextI].position.y,
          spheres[nextI].position.z,
        ])
        lines[i].geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-64 rounded-lg overflow-hidden" />
}
